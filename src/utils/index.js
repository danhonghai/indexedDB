/*
 * @Author: danhonghai danhonghai@shinemo.com
 * @Date: 2022-08-30 15:41:51
 * @LastEditors: danhonghai danhonghai@shinemo.com
 * @LastEditTime: 2022-08-30 20:29:33
 * @FilePath: \react-hooks-demo\src\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export const openDB = async (dbName, version = 1) => {
  return new Promise((resolve, reject) => {
    //  兼容浏览器
    var indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
    let db
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version)
    // 数据库打开成功回调
    request.onsuccess = function (event) {
      db = event.target.result // 数据库对象
      console.log('数据库打开成功')

      resolve(db)
    }
    // 数据库打开失败的回调
    request.onerror = function (event) {
      console.log('数据库打开报错')
    }
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event) {
      // 数据库创建或升级的时候会触发
      console.log('onupgradeneeded')
      db = event.target.result // 数据库对象
      var objectStore
      // 创建存储库
      objectStore = db.createObjectStore('user', {
        keyPath: 'id', // 这是主键
        autoIncrement: true, // 实现自增
      })
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('age', 'age')
      objectStore.createIndex('sex', 'sex')
      objectStore.createIndex('address', 'address')
      objectStore.createIndex('phone', 'phone', {
        unique: false,
      })
    }
  })
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export const addData = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(data)

    request.onsuccess = function (event) {
      resolve({ success: true })
      console.log('数据写入成功')
    }

    request.onerror = function (event) {
      console.log('数据写入失败')
      resolve({ success: false })
    }
  })
}

/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
export const cursorGetData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    let list = []
    var store = db
      .transaction(storeName, 'readwrite') // 事务
      .objectStore(storeName) // 仓库对象
    var request = store.openCursor() // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = function (e) {
      var cursor = e.target.result
      if (cursor) {
        // 必须要检查
        list.push(cursor.value)
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        console.log('游标读取的数据：', list)
        resolve(list)
      }
    }
  })
}
/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */   
export const cursorGetDataByIndex = (db, storeName, indexName, indexValue) => {
  return new Promise((resolve, reject) => {
    let list = []
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
    var request = store
      .index(indexName) // 索引对象
      .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
    request.onsuccess = function (e) {
      var cursor = e.target.result
      if (cursor) {
        // 必须要检查
        list.push(cursor.value)
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        console.log('游标索引查询结果：', list)
        resolve(list)
      }
    }
    request.onerror = function (e) {}
  })
}

/**
 * 通过索引和游标分页查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 */
export const cursorGetDataByIndexAndPage = (
  db,
  storeName,
  indexName,
  indexValue,
  page,
  pageSize
) => {
  let list = []
  let counter = 0 // 计数器
  let advanced = true // 是否跳过多少条查询
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
  var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
  request.onsuccess = function (e) {
    var cursor = e.target.result
    if (page > 1 && advanced) {
      advanced = false
      cursor.advance((page - 1) * pageSize) // 跳过多少条
      return
    }
    if (cursor) {
      // 必须要检查
      list.push(cursor.value)
      counter++
      if (counter < pageSize) {
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        cursor = null
        console.log('分页查询结果', list)
      }
    } else {
      console.log('分页查询结果', list)
    }
  }
  request.onerror = function (e) {}
}
/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export const updateDB = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction([storeName], 'readwrite') // 事务对象
      .objectStore(storeName) // 仓库对象
      .put(data)

    request.onsuccess = function () {
      console.log('数据更新成功')
      resolve({ success: true })
    }

    request.onerror = function () {
      console.log('数据更新失败')
      resolve({ success: false })
    }
  })
}
/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
export const deleteDB = (db, storeName, id) => {
  return new Promise((resolve, reject) => {
    var request = db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(id)

    request.onsuccess = function () {
      console.log('数据删除成功')
      resolve({ success: true })
    }

    request.onerror = function () {
      console.log('数据删除失败')
      resolve({ success: false })
    }
  })
}
/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
export const closeDB = (db) => {
  db.close()
  console.log('数据库已关闭')
}

/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
export const deleteDBAll = (dbName) => {
  console.log(dbName)
  var indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
  let deleteRequest = indexedDB.deleteDatabase(dbName)
  deleteRequest.onerror = function (event) {
    console.log('删除失败')
  }
  deleteRequest.onsuccess = function (event) {
    console.log('删除成功')
  }
}

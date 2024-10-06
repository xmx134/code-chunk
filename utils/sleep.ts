// 让后续操作在休眠后继续执行
function sleep(timeout: number = 1000) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

// 使用例子
async function install() {
  console.log('执行操作中...')
  await sleep(2000)
  console.log('2秒后操作执行完成')
}

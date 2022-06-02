const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, '../ReleasesWin32')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'RiverStompTester-win32-ia32'),
    authors: 'Henit Chobisa',
    noMsi: true,
    outputDirectory: path.join(rootPath, '../RiverWindowsInstaller'),
    exe: 'RiverStompTester.exe',
    setupExe: 'RiverSetup.exe',
    description : "Testing software for stomp message broker",
    setupIcon: path.join(rootPath,"src" ,"Assets", "logo.ico")
  })
}
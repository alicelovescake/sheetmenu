
  const proxyquire = require("proxyquire")
  const fs = require('fs')
  const path = require('path')
  const files = {}
  const fileOverrides = {"file:///Users/alicezhao/dev/sheetmenu/web/src/App.js":"import { AuthProvider } from '@redwoodjs/auth'\nimport * as firebase from 'firebase/app'\nimport 'firebase/auth'\nimport { FatalErrorBoundary } from '@redwoodjs/web'\nimport { RedwoodApolloProvider } from '@redwoodjs/web/apollo'\n\nimport FatalErrorPage from 'src/pages/FatalErrorPage'\nimport Routes from 'src/Routes'\n\nimport './index.css'\n\nconst firebaseClientConfig = {\n  apiKey: process.env.FIREBASE_API_KEY,\n  authDomain: process.env.FIREBASE_AUTH_DOMAIN,\n  databaseURL: process.env.FIREBASE_DATABASE_URL,\n  projectId: process.env.FIREBASE_PROJECT_ID,\n  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,\n  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,\n  appId: process.env.FIREBASE_APP_ID,\n}\n\nconst firebaseClient = ((config) => {\n  firebase.initializeApp(config)\n  return firebase\n})(firebaseClientConfig)\n\nconst App = () => (\n  <FatalErrorBoundary page={FatalErrorPage}>\n    <AuthProvider client={firebaseClient} type=\"firebase\">\n      <RedwoodApolloProvider>\n        <Routes />\n      </RedwoodApolloProvider>\n    </AuthProvider>\n  </FatalErrorBoundary>\n)\n\nexport default App\n","file:///Users/alicezhao/dev/sheetmenu/web/src/layouts/AppLayout/AppLayout.stories.js":"import AppLayout from './AppLayout'\n\nexport const generated = () => {\n  return <AppLayout />\n}\n\nexport default { title: 'Layouts/AppLayout' }\n","file:///Users/alicezhao/dev/sheetmenu/web/src/Routes.js":"// In this file, all Page components from 'src/pages` are auto-imported. Nested\n// directories are supported, and should be uppercase. Each subdirectory will be\n// prepended onto the component name.\n//\n// Examples:\n//\n// 'src/pages/HomePage/HomePage.js'         -> HomePage\n// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage\n\nimport { Router, Route, Set } from '@redwoodjs/router'\n\nimport AppLayout from 'src/layouts/AppLayout'\n\nconst Routes = () => {\n  return (\n    \n    <Router>\n      <Route notfound page={NotFoundPage} />\n    </Router>\n  )\n}\n\nexport default Routes\n"}
  const FILE_SCHEME = 'file://'

  function URL_file(f) {
    if (f.startsWith(FILE_SCHEME))
      f = f.substr(FILE_SCHEME.length)
    return new URL(FILE_SCHEME + path.normalize(f)).href
  }

  proxyquire('@redwoodjs/cli/dist', {
    fs: {
      mkdir() {},
      mkdirSync(...args) {},
      writeFile(a, b) {
        files[URL_file(a)] = b
      },
      writeFileSync(a, b) {
        files[URL_file(a)] = b
      },
      readFileSync(...args) {
        const f = URL_file(args[0])
        if (fileOverrides[f]) return fileOverrides[f]
        return fs.readFileSync.apply(fs, args)
      },
      '@global': true,
    },
  })

  process.on('exit', () => {
    console.log("---------===----===--------")
    console.log(JSON.stringify(files, null, 2))
  })
  
/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'//src/compiler

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }

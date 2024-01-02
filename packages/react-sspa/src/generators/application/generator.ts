import {
  ProjectConfiguration,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  joinPathFragments,
  names,
  Tree,
  runTasksInSerial,
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
} from '@nx/devkit';
import { reactDomVersion, reactVersion , tsLibVersion, nxVersion, typesNodeVersion, typesReactVersion, typesReactDomVersion, testingLibraryReactVersion, reactRouterDomVersion, reactReduxVersion} from './lib/versions';
import { initGenerator, initGenerator as jsInitGenerator } from '@nx/js';
import { ReactSingleSpaNxGeneratorSchema, NormalizedSchema , InitSchema} from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { getReactSingleSPAProjectTargets } from './lib/get-react-single-spa-project-targets';

function addProject(tree: Tree, options: NormalizedSchema) {
  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'application',
    targets: getReactSingleSPAProjectTargets(options),
  };

  addProjectConfiguration(tree, options.projectRoot, {
    ...project,
  });
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.singleSPAOrg),
    ...names(options.projectName),
    templ: '',
  };
  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}
//TODO fix this, need to get it run smmothly, also, need to get the correct directory for both package.json, and the project
function updateDependencies(host: Tree, schema: InitSchema) {
    removeDependenciesFromPackageJson(host, ['@nx/react'], []);

    // like origin code from nx js, I placed a versions.ts file in the lib
    // this also means I have to update the code constantly in the future
    const dependencies = {
      react: reactVersion,
      'react-dom': reactDomVersion,
      'react-router-dom':reactRouterDomVersion,
      'react-redux':reactReduxVersion
    };
  
    if (!schema.skipHelperLibs) {
      dependencies['tslib'] = tsLibVersion;
    }
    console.log('updateDependencies: add dependencies');
    return addDependenciesToPackageJson(host, dependencies, {
      '@nx/eslint': nxVersion,
      '@nx/react': nxVersion,
      '@types/node': typesNodeVersion,
      '@types/react': typesReactVersion,
      '@types/react-dom': typesReactDomVersion,
      '@testing-library/react': testingLibraryReactVersion,
    });
}
  
// 
// async function addWebpack(tree: Tree, options: NormalizedSchema) {
//     const { webpackInitGenerator } = ensurePackage<
//       typeof import('@nx/webpack')
//     >('@nx/webpack', nxVersion);
//     const webpackInitTask = await webpackInitGenerator(host, {
//       uiFramework: 'react',
//       skipFormat: true,
//     });
//     tasks.push(webpackInitTask);
// }
/** 
* Generate app with this plugin
* @summary 
     1. normalize the schema. 
     2. init create files like .estlintrc, .tsconfig, package.json, etc.
     3. update package 
     4. create basic project
* @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/
// TODO update root package.json, add dependencies and scripts
export async function appGenerator(
  tree: Tree,
  schema: ReactSingleSpaNxGeneratorSchema
): Promise<GeneratorCallback> {
  const options: NormalizedSchema = await normalizeOptions(tree, schema);
  const tasks: GeneratorCallback[] = [];
  await jsInitGenerator(tree, {
    skipFormat: true,
  });
  addProject(tree, options);
  addFiles(tree, options);

  tasks.push(
    await initGenerator(tree, {
      skipFormat: true,
    })
  );
  if (!schema.skipPackageJson) {
    console.log('update package');
    const installTask = updateDependencies(tree, schema);
    tasks.push(installTask);
  }

  return runTasksInSerial(...tasks);
}

export default appGenerator;

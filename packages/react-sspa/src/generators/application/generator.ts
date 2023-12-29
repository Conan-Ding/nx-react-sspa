import {
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    GeneratorCallback,
    joinPathFragments,
    names,
    Tree,
    runTasksInSerial,
  } from '@nx/devkit';
  import { initGenerator, initGenerator as jsInitGenerator } from '@nx/js';
import {ReactSingleSpaNxGeneratorSchema, NormalizedSchema} from './schema';
import {normalizeOptions} from './lib/normalize-options';
import {getReactSingleSPAProjectTargets} from './lib/get-react-single-spa-project-targets';

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
        ...options,
        ...names(options.singleSPAOrg),
        ...names(options.projectName),
        templ: '',   
    }
    generateFiles(
        tree,
        joinPathFragments(__dirname, 'files'),
        options.projectRoot,
        templateOptions
    )
}
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
export async function appGenerator(tree: Tree, schema: ReactSingleSpaNxGeneratorSchema):Promise<GeneratorCallback>  {
    const options:NormalizedSchema = await normalizeOptions(tree, schema);
    const tasks: GeneratorCallback[] = [];
    await jsInitGenerator(tree, {
        skipFormat: true,
      });
    addProjectConfiguration(tree, options.projectName, {
        name: options.projectName,
        root: options.projectRoot,
        projectType: 'application',
        sourceRoot: joinPathFragments(options.projectRoot, 'src'),
        tags: [],
        targets: getReactSingleSPAProjectTargets(options),    
    });
    addFiles(tree, options);

    tasks.push(await initGenerator(tree, {
        skipFormat: true,
    }));

    return runTasksInSerial(...tasks);
}


export default appGenerator
import {
  Tree,
} from '@nx/devkit';
// import * as path from 'path';
import { PresetGeneratorSchema } from './schema';
import appGenerator from '../application/generator';
export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  return await appGenerator(tree, {
    organization: options.organization,
    name: options.name,
    skipPackageJson: false
  });
  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  // await formatFiles(tree);
}

export default presetGenerator;

import { offsetFromRoot, Tree } from '@nx/devkit';
import { getRelativePathToRootTsConfig } from '@nx/js';
import { NormalizedSchema, ReactSingleSpaNxGeneratorSchema } from '../schema';
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils';

export async function normalizeOptions(
  tree: Tree,
  schema: ReactSingleSpaNxGeneratorSchema
): Promise<NormalizedSchema> {
  const options = await determineProjectNameAndRootOptions(tree, {
    name: schema.name,
    projectType: 'application',
    callingGenerator: 'react-sspa',
    directory: schema.directory,
    projectNameAndRootFormat: schema.projectNameAndRootFormat || 'derived',
  });
  const singleSPAOrg = schema.organization;
  return {
    ...schema,
    ...options,
    singleSPAOrg,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(tree, options.projectRoot),
  };
}

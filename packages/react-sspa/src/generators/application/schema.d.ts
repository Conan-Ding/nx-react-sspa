import { Linter } from '@nx/eslint';
import type { ProjectNameAndRootFormat } from '@nx/devkit/src/generators/project-name-and-root-utils';


export interface ReactSingleSpaNxGeneratorSchema {
    organization: string;
    name: string;
    directory?: string;
    projectNameAndRootFormat?: ProjectNameAndRootFormat;
}

export interface NormalizedSchema extends ReactSingleSpaNxGeneratorSchema{
    singleSPAOrg: string;
    projectName: string;
    projectRoot: string;
    projectNameAndRootFormat: ProjectNameAndRootFormat;
    rootTsConfigPath: string;
    offsetFromRoot: string;
}
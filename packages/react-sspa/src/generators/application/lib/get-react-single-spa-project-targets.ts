import { TargetConfiguration } from '@nx/devkit';

export interface UpdateReactSingleSPAAppConfigurationParams {
  projectName: string;
  projectRoot: string;
  offsetFromRoot: string;
  devServerPort?: number;
  previewServerPort?: number;
}
//TODO need to implement own executor and use it instead of @nx/vite:build and @nx/vite:dev-server
function getBuildTarget(params:UpdateReactSingleSPAAppConfigurationParams): TargetConfiguration {
    return {
        executor: 'webpack build',
        outputs: ['{options.outputPath}'],
        options: {
            outputPath: `dist/${params.projectName}`,
            configFile: `${params.projectRoot}/webpack.config.ts`,
        },
    };
}
//TODO need to implement own executor and use it instead of @nx/vite:build and @nx/vite:dev-server
function getPreviewTarget(params:UpdateReactSingleSPAAppConfigurationParams): TargetConfiguration {
    return {
        executor: 'webpack serve',
        options: {
            buildTarget: `${params.projectName}:build`,
            hmr: true,
            port: params.devServerPort,
        },
    };
}

export function getReactSingleSPAProjectTargets(params:UpdateReactSingleSPAAppConfigurationParams): Record<string, TargetConfiguration> {
    return {
        build: getBuildTarget(params),
        preview: getPreviewTarget(params),
    };
}
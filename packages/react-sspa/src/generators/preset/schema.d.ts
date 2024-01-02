import { Linter } from '@nx/eslint';
import { Schema } from '../application/schema';

export interface PresetGeneratorSchema  extends Schema{
  name: string;
  organization: string;
  directory?: string;
  standalone?:boolean
}

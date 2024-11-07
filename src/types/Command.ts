import { CommandPayload } from '@store/types';

export interface CommandDetailsProps {
  commandTextParts: string[];
  commandValue: { firstValue: number; secondValue: number };
  setCommandValue: React.Dispatch<React.SetStateAction<CommandPayload>>;
}

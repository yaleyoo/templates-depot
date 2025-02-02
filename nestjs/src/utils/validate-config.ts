import { ClassConstructor } from 'class-transformer/types/interfaces';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

const validateConfig = <T extends object>(
  config: Record<string, unknown>,
  envVariableClass: ClassConstructor<T>,
) => {
  const validateConfig = plainToClass(envVariableClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
};

export default validateConfig;

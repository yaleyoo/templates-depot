import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'isExists', async: true })
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];

    const entity: unknown = await this.dataSource
      .getRepository(repository)
      .findOne({
        where: {
          [pathToProperty ? pathToProperty : validationArguments.property]:
            pathToProperty ? value?.[pathToProperty] : value,
        },
      });

    return Boolean(entity);
  }

  defaultMessage(args: ValidationArguments): string {
    const [entityClass] = args.constraints;
    const entityName = entityClass.name || 'Entity';

    return `${args?.property} does not exist in ${entityName}`;
  }
}

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { State } from '../../orders/entities/state.entity';

interface StateData {
  name: string;
  abbreviation: string;
  polygon: string;
}

export default class StateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const states: StateData[] = await readCsv(
      path.resolve('./src/db/data', 'usstates.csv'),
    );

    const currentStates = await connection
      .getRepository(State)
      .createQueryBuilder()
      .select()
      .getMany();

    for (const state of states) {
      const stateExist = currentStates.find((x) => x.name === state.name);

      if (stateExist) {
        await connection.query(
          `UPDATE states SET abbreviation = '${
            state.abbreviation
          }', polygon = ST_GeomFromGeoJSON('${state.polygon.replace(
            "'",
            '',
          )}') WHERE name = '${state.name}'`,
        );
      } else {
        await connection.query(
          `INSERT INTO states (name, abbreviation, polygon) values ('${
            state.name
          }', '${
            state.abbreviation
          }', ST_GeomFromGeoJSON('${state.polygon.replace("'", '')}'))`,
        );
      }
    }
  }
}

function readCsv(path): Promise<StateData[]> {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        throw new Error(`Error occurred while reading csv file ${error}`);
      })
      .on('data', (row) => data.push(row))
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(data);
      });
  });
}

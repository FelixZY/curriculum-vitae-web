import { useCallback, useState } from "react";
import { useExpiringEffect } from "../util/hooks";

type DataStoreContainer<T> = {
  version: number;
  name: string;
  data: T;
};
export function useDataStore<T>(
  dataStore: DataStore<T>
): [T, (newValue: T) => void] {
  const [data, setData] = useState<T>(dataStore.read());
  const writeToDataStore = useCallback(
    (value: T) => {
      dataStore.write(value);
    },
    [dataStore]
  );

  useExpiringEffect(
    useCallback(
      (getExpired) => {
        dataStore.writePromise.then((newValue) => {
          // Do not notify removed components
          if (!getExpired()) {
            setData(newValue);
          }
        });
      },
      [dataStore.writePromise, setData]
    )
  );

  return [data, writeToDataStore];
}

export abstract class DataStore<T> {
  private writePromiseResolve!: (value: T | PromiseLike<T>) => void;
  private _writePromise: Promise<T>;

  /**
   * A promise that will resolve upon the next write to this {@link DataStore}
   */
  public get writePromise(): Promise<T> {
    return this._writePromise;
  }

  constructor(
    protected readonly version: number,
    protected readonly name: string,
    protected readonly defaultData: T
  ) {
    this._writePromise = new Promise((resolve) => {
      this.writePromiseResolve = resolve;
    });
  }

  public mutate(callback: (data: T) => void) {
    const data = this.read();
    callback(data);
    this.write(data);
  }

  public write(data: T) {
    localStorage.setItem(
      this.name,
      JSON.stringify(this.createStorageContainer(data))
    );
    const resolve = this.writePromiseResolve;
    this._writePromise = new Promise((resolve) => {
      this.writePromiseResolve = resolve;
    });
    resolve(data);
  }

  public read(resetToDefaultOnError: boolean = true): T {
    function loadInternal(self: DataStore<T>): T {
      const dataContainer = JSON.parse(
        localStorage.getItem(self.name) ??
          JSON.stringify(self.createStorageContainer(self.defaultData))
      ) as DataStoreContainer<T>;

      if (dataContainer.version < self.version) {
        dataContainer.data = self.migrate(
          dataContainer.version,
          dataContainer.data
        );
      } else if (dataContainer.version > self.version) {
        if (resetToDefaultOnError) {
          localStorage.removeItem(self.name);
          return loadInternal(self);
        } else {
          throw new Error(
            `DataStore is outdated. Current version: ${self.version} | Stored version: ${dataContainer.version}`
          );
        }
      }
      return dataContainer.data;
    }

    try {
      return loadInternal(this);
    } catch (e) {
      if (resetToDefaultOnError) {
        localStorage.removeItem(this.name);
        return loadInternal(this);
      } else throw e;
    }
  }

  protected abstract migrate(fromVersion: number, data: any): T;

  private createStorageContainer(data: T): DataStoreContainer<T> {
    return {
      version: this.version,
      name: this.name,
      data,
    };
  }
}

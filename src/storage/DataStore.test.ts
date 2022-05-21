import { act, renderHook } from "@testing-library/react";
import { DataStore, useDataStore } from "../storage/DataStore";

type TestData = {
  wasMigrated: boolean;
  str: string;
  obj: {
    str: string;
    obj: {
      str: string;
    };
  };
};
const DATASTORE_NAME = "test";
const DEFAULT_DATA: TestData = {
  str: "str",
  wasMigrated: false,
  obj: {
    str: "obj.str",
    obj: {
      str: "obj.obj.str",
    },
  },
};

class TestDataHookWrapper<T> {
  constructor(
    private _datastore: DataStore<T>,
    private _hook: { current: [TestData, (newValue: TestData) => void] }
  ) {}
  get data() {
    return this._hook.current[0];
  }
  get setData() {
    return async (newValue: TestData) =>
      act(async () => {
        let writePromise = this._datastore.writePromise;
        this._hook.current[1](newValue);
        await writePromise;
      });
  }
}

beforeEach(() => {
  localStorage.clear();
});

function createDataStore(version: number = 1): DataStore<TestData> {
  return new (class extends DataStore<TestData> {
    constructor() {
      super(version, DATASTORE_NAME, DEFAULT_DATA);
    }
    protected migrate(_: number, data: any): TestData {
      data.wasMigrated = true;
      this.write(data);
      return data;
    }
  })();
}

test("Simple read returns default data", async () => {
  const dataStore = createDataStore();

  expect(dataStore.read()).toMatchObject<TestData>(DEFAULT_DATA);
});

test("Hook initial data is default data", async () => {
  const dataStore = createDataStore();
  const hook = new TestDataHookWrapper(
    dataStore,
    renderHook(() => useDataStore(dataStore))["result"]
  );

  expect(hook.data).toMatchObject<TestData>(DEFAULT_DATA);
});

test("Hook can be used to read and write", async () => {
  const dataStore = createDataStore();
  const hook = new TestDataHookWrapper(
    dataStore,
    renderHook(() => useDataStore(dataStore))["result"]
  );
  let expected = DEFAULT_DATA;

  expect(hook.data).toMatchObject<TestData>(expected);

  expected = {
    ...DEFAULT_DATA,
    str: "modified",
  };
  await hook.setData(expected);
  expect(hook.data).toMatchObject<TestData>(expected);

  expected = {
    ...expected,
    obj: {
      ...expected.obj,
      str: "modified",
    },
  };
  await hook.setData(expected);
  expect(hook.data).toMatchObject<TestData>(expected);

  expected = {
    ...expected,
    obj: {
      ...expected.obj,
      obj: {
        ...expected.obj.obj,
        str: "modified",
      },
    },
  };
  await hook.setData(expected);
  expect(hook.data).toMatchObject<TestData>(expected);
});

test("Read throws on bad data", async () => {
  const dataStore = createDataStore();
  localStorage.setItem(DATASTORE_NAME, "garbage_data");
  expect(() => dataStore.read(false)).toThrowError();
});

test("Read can be reset on bad data", async () => {
  const dataStore = createDataStore();
  localStorage.setItem(DATASTORE_NAME, "garbage_data");
  expect(dataStore.read()).toMatchObject<TestData>(DEFAULT_DATA);
});

test("Mutate updates data", async () => {
  const dataStore = createDataStore();

  const expected = {
    ...DEFAULT_DATA,
    str: "modified",
  };
  dataStore.mutate((data) => {
    data.str = "modified";
  });
  expect(dataStore.read()).toMatchObject<TestData>(expected);
});

test("Write updates data", async () => {
  const dataStore = createDataStore();

  const expected = {
    ...DEFAULT_DATA,
    str: "modified",
  };
  dataStore.write(expected);
  expect(dataStore.read()).toMatchObject<TestData>(expected);
});

test("State is synced between multiple data store instances", async () => {
  const dataStore1 = createDataStore();
  const dataStore2 = createDataStore();

  dataStore1.mutate((data) => {
    data.str = "modified";
  });

  expect(dataStore1.read()).toMatchObject<TestData>(dataStore2.read());
});

test("DataStore migration", async () => {
  const dataStore1 = createDataStore(1);
  const dataStore2 = createDataStore(2);

  // Ensure data is written to storage
  dataStore1.mutate((data) => data);
  expect(localStorage.getItem(DATASTORE_NAME)).toBeTruthy();

  expect(dataStore1.read().wasMigrated).toBe(false);

  // Migration is expected on read
  expect(dataStore2.read().wasMigrated).toBe(true);

  // Reading new data with an old store is not supported
  expect(() => dataStore1.read(false)).toThrowError();

  // resetToDefaultOnError=true should reset the storage to defaults
  expect(dataStore1.read().wasMigrated).toBe(false);
});

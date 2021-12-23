import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  get,
  set,
  update,
} from "firebase/database";
import {
  defaultState,
  DEFAULT_TABLE_KEY,
  DEFAULT_USER_KEY,
  ITableScore,
} from "../models/ScoreSlice";

export async function createTable(userId: string) {
  const db = getDatabase();
  const newTableKey = push(child(ref(db), "tables")).key;
  set(ref(db, `tables/${newTableKey}/${userId}`), {
    score: defaultState[DEFAULT_TABLE_KEY][DEFAULT_USER_KEY],
    created_on: Date.now(),
    updated_on: Date.now(),
  });

  return newTableKey;
}

export async function joinTable({
  tableId,
  userId,
}: {
  tableId: string;
  userId: string;
}) {
  const db = getDatabase();

  const tableRef = ref(db, `tables/${tableId}`);
  const table = await get(tableRef);

  // Table Exists
  if (table.val()) {
    const updates: { [key: string]: {} } = {};

    const tableRef = ref(db, `tables/${tableId}/${userId}`);
    const playerScore = await get(tableRef);


    playerScore.val()

    if (!playerScore.val()) {
      updates[`tables/${tableId}/${userId}`] = {
        score: defaultState[DEFAULT_TABLE_KEY][DEFAULT_USER_KEY],
        created_on: Date.now(),
        updated_on: Date.now(),
      };

      return update(ref(db), updates);
    }

  }
}

export function updateScore({
  score,
  tableId,
  userId,
}: {
  tableId: string;
  score: ITableScore;
  userId: string;
}) {
  const db = getDatabase();
  update(ref(db, `tables/${tableId}/${userId}`), {
    score,
    updated_on: Date.now(),
  });
}

export interface IUserScores {
  [userId: string]: {
    created_on: number;
    score: ITableScore;
  };
}

export function watchTableData(
  { tableId }: { tableId: string },
  handler: (userScores: IUserScores) => void
) {
  const db = getDatabase();
  const table = ref(db, `tables/${tableId}/`);

  const cancel = onValue(table, (snapshot) => {
    const data: IUserScores = snapshot.val();
    handler(data);
  });

  return cancel;
}

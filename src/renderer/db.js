/* eslint-disable import/prefer-default-export */
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(9).stores({
  classes: '++id, &name, class_1_id, class_2_id',
  classrooms: '++id, &name, remark, status',
  sessions:
    '++id, subject_id, class_id, teacher_id, classroom_id, weekday, start_time, end_time',
  subjects: '++id, &name',
  teachers: '++id, &name, subject, email, tel, status',
});

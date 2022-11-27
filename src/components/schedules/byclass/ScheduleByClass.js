/* eslint-disable no-lonely-if */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable radix */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactToPrint from 'react-to-print';
import { db } from 'renderer/db';
import LoadingCmp from '../../LoadingCmp';
import Td from './Td';
import AddSessionByClassModal from './AddSessionByClassModal';
import EditSessionByClassModal from './EditSessionByClassModal';
import '../ToPrint.css';
import TdToPrint from './TdToPrintByClass';

export default function ScheduleByClass() {
  function organise(item, day, data, setdata) {
    if (item.weekday == day) {
      if (item.start_time == '08:00:00') {
        if (item.end_time == '12:00:00') {
          setdata((data) => ({
            ...data,
            h_8_9: item,
            h_9_10: item,
            h_10_11: item,
            h_11_12: item,
          }));
        } else if (item.end_time == '11:00:00') {
          setdata((data) => ({
            ...data,
            h_8_9: item,
            h_9_10: item,
            h_10_11: item,
          }));
        } else if (item.end_time == '10:00:00') {
          setdata((data) => ({ ...data, h_8_9: item, h_9_10: item }));
        } else {
          setdata((data) => ({ ...data, h_8_9: item }));
        }
      } else if (item.start_time == '09:00:00') {
        if (item.end_time == '13:00:00') {
          setdata((data) => ({
            ...data,
            h_9_10: item,
            h_10_11: item,
            h_11_12: item,
            h_12_13: item,
          }));
        } else if (item.end_time == '12:00:00') {
          setdata((data) => ({
            ...data,
            h_9_10: item,
            h_10_11: item,
            h_11_12: item,
          }));
        } else if (item.end_time == '11:00:00') {
          setdata((data) => ({ ...data, h_9_10: item, h_10_11: item }));
        } else {
          setdata((data) => ({ ...data, h_9_10: item }));
        }
      } else if (item.start_time == '10:00:00') {
        if (item.end_time == '14:00:00') {
          setdata((data) => ({
            ...data,
            h_10_11: item,
            h_11_12: item,
            h_12_13: item,
            h_13_14: item,
          }));
        } else if (item.end_time == '13:00:00') {
          setdata((data) => ({
            ...data,
            h_10_11: item,
            h_11_12: item,
            h_12_13: item,
          }));
        } else if (item.end_time == '12:00:00') {
          setdata((data) => ({ ...data, h_10_11: item, h_11_12: item }));
        } else {
          setdata((data) => ({ ...data, h_10_11: item }));
        }
      } else if (item.start_time == '11:00:00') {
        if (item.end_time == '15:00:00') {
          setdata((data) => ({
            ...data,
            h_11_12: item,
            h_12_13: item,
            h_13_14: item,
            h_14_15: item,
          }));
        } else if (item.end_time == '14:00:00') {
          setdata((data) => ({
            ...data,
            h_11_12: item,
            h_12_13: item,
            h_13_14: item,
          }));
        } else if (item.end_time == '13:00:00') {
          setdata((data) => ({ ...data, h_11_12: item, h_12_13: item }));
        } else {
          setdata((data) => ({ ...data, h_11_12: item }));
        }
      } else if (item.start_time == '12:00:00') {
        if (item.end_time == '16:00:00') {
          setdata((data) => ({
            ...data,
            h_12_13: item,
            h_13_14: item,
            h_14_15: item,
            h_15_16: item,
          }));
        } else if (item.end_time == '15:00:00') {
          setdata((data) => ({
            ...data,
            h_12_13: item,
            h_13_14: item,
            h_14_15: item,
          }));
        } else if (item.end_time == '14:00:00') {
          setdata((data) => ({ ...data, h_12_13: item, h_13_14: item }));
        } else {
          setdata((data) => ({ ...data, h_12_13: item }));
        }
      } else if (item.start_time == '13:00:00') {
        if (item.end_time == '17:00:00') {
          setdata((data) => ({
            ...data,
            h_13_14: item,
            h_14_15: item,
            h_15_16: item,
            h_16_17: item,
          }));
        } else if (item.end_time == '16:00:00') {
          setdata((data) => ({
            ...data,
            h_13_14: item,
            h_14_15: item,
            h_15_16: item,
          }));
        } else if (item.end_time == '15:00:00') {
          setdata((data) => ({ ...data, h_13_14: item, h_14_15: item }));
        } else {
          setdata((data) => ({ ...data, h_13_14: item }));
        }
      } else if (item.start_time == '14:00:00') {
        if (item.end_time == '17:00:00') {
          setdata((data) => ({
            ...data,
            h_14_15: item,
            h_15_16: item,
            h_16_17: item,
          }));
        } else if (item.end_time == '16:00:00') {
          setdata((data) => ({ ...data, h_14_15: item, h_15_16: item }));
        } else {
          setdata((data) => ({ ...data, h_14_15: item }));
        }
      } else if (item.start_time == '15:00:00') {
        if (item.end_time == '17:00:00') {
          setdata((data) => ({ ...data, h_15_16: item, h_16_17: item }));
        } else {
          setdata((data) => ({ ...data, h_15_16: item }));
        }
      } else if (item.start_time == '16:00:00') {
        setdata((data) => ({ ...data, h_16_17: item }));
      }
    }
  }
  const [monday, setMonday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const [tuesday, setTuesday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const [wednesday, setWednesday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const [thursday, setThursday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const [friday, setFriday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const [saturday, setSaturday] = useState({
    h_8_9: {},
    h_9_10: {},
    h_10_11: {},
    h_11_12: {},
    h_12_13: {},
    h_13_14: {},
    h_14_15: {},
    h_15_16: {},
    h_16_17: {},
  });

  const componentRef = useRef();

  const [toAdd, setToAdd] = useState({});
  const [toEdit, setToEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const setToAddChild = (item) => {
    setToAdd(item);
  };
  const setToAddModal = (bool) => {
    setModalShow(bool);
  };

  const setToEditChild = (item) => {
    setToEdit(item);
  };
  const setToEditModal = (bool) => {
    setEditModalShow(bool);
  };

  const [itemsList, setItemsList] = useState([]);
  const setItems = (items) => {
    setItemsList(items);
  };

  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [classe, setClasse] = useState({});
  const [sharedSessions1, setSharedSessions1] = useState([]);
  const [sharedSessions2, setSharedSessions2] = useState([]);

  useEffect(() => {
    db.classes.get(Number.parseInt(id)).then((res) => {
      if (res) setClasse(res);
    });
  }, [id]);

  const sessions = useLiveQuery(() =>
    db.sessions.where('class_id').equals(Number.parseInt(id)).toArray()
  );

  useEffect(() => {
    if (sessions) setItemsList(sessions);
    else setItemsList([]);
  }, [sessions]);

  const classes1 = useLiveQuery(() =>
    db.classes.where('class_1_id').equals(Number.parseInt(id)).toArray()
  );
  const classes2 = useLiveQuery(() =>
    db.classes.where('class_2_id').equals(Number.parseInt(id)).toArray()
  );

  useEffect(() => {
    if (classes1) {
      classes1.map((classe) => {
        db.sessions
          .where('class_id')
          .equals(classe.id)
          .toArray()
          .then((res) => {
            if (res) {
              setSharedSessions1(res);
              setItemsList(() => [...sessions, ...sharedSessions1]);
            } else {
              setSharedSessions1([]);
              setItemsList(() => [...sessions, ...sharedSessions2]);
            }
          });
      });
    }
  }, [classes1, itemsList]);

  useEffect(() => {
    if (classes2) {
      classes2.map((classe) => {
        db.sessions
          .where('class_id')
          .equals(classe.id)
          .toArray()
          .then((res) => {
            if (res) {
              setSharedSessions2(res);
              setItemsList(() => [...sessions, ...sharedSessions2]);
            } else {
              setSharedSessions2([]);
              setItemsList(() => [...sessions, ...sharedSessions1]);
            }
          });
      });
    }
  }, [classes2, itemsList]);

  useEffect(() => {
    setMonday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    setTuesday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    setWednesday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    setThursday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    setFriday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    setSaturday({
      h_8_9: {},
      h_9_10: {},
      h_10_11: {},
      h_11_12: {},
      h_12_13: {},
      h_13_14: {},
      h_14_15: {},
      h_15_16: {},
      h_16_17: {},
    });
    itemsList.map((item) => {
      // monday
      organise(item, 'Monday', monday, setMonday);
      // tuesday
      organise(item, 'Tuesday', tuesday, setTuesday);
      // wednesday
      organise(item, 'Wednesday', wednesday, setWednesday);
      // thursday
      organise(item, 'Thursday', thursday, setThursday);
      // friday
      organise(item, 'Friday', friday, setFriday);
      // saturday
      organise(item, 'Saturday', saturday, setSaturday);
    });
  }, [itemsList]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return <LoadingCmp />;
  }

  return (
    <div className="container">
      <div className="text-secondary">
        <Link className="text-decoration-none text-secondary" to="/home">
          <FontAwesomeIcon className="text-secondary" icon="fas fa-home" /> Home
        </Link>{' '}
        {'>>'}{' '}
        <Link className="text-decoration-none text-secondary" to="/schedules">
          {' '}
          emplois{' '}
        </Link>{' '}
        {'>>'}{' '}
        <Link
          className="text-decoration-none text-secondary"
          to="/schedules/schedules-by-class"
        >
          emploie par classe
        </Link>{' '}
        {'>>'} {classe.name ? classe.name : ''}{' '}
      </div>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr className="bg-light-gray">
              <th>16 - 17</th>
              <th>15 - 16</th>
              <th>14 - 15</th>
              <th>13 - 14</th>
              <th>12 - 13</th>
              <th>11 - 12</th>
              <th>10 - 11</th>
              <th>9 - 10</th>
              <th>8 - 9</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '16:00:00',
                }}
                item={monday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '15:00:00',
                }}
                item={monday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '14:00:00',
                }}
                item={monday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '13:00:00',
                }}
                item={monday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '12:00:00',
                }}
                item={monday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '11:00:00',
                }}
                item={monday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '10:00:00',
                }}
                item={monday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '09:00:00',
                }}
                item={monday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Monday',
                  start_time: '08:00:00',
                }}
                item={monday.h_8_9}
              />
              <th className="align-middle">الإثنين</th>
            </tr>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '16:00:00',
                }}
                item={tuesday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '15:00:00',
                }}
                item={tuesday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '14:00:00',
                }}
                item={tuesday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '13:00:00',
                }}
                item={tuesday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '12:00:00',
                }}
                item={tuesday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '11:00:00',
                }}
                item={tuesday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '10:00:00',
                }}
                item={tuesday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '09:00:00',
                }}
                item={tuesday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Tuesday',
                  start_time: '08:00:00',
                }}
                item={tuesday.h_8_9}
              />
              <th className="align-middle">الثلاثاء</th>
            </tr>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '16:00:00',
                }}
                item={wednesday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '15:00:00',
                }}
                item={wednesday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '14:00:00',
                }}
                item={wednesday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '13:00:00',
                }}
                item={wednesday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '12:00:00',
                }}
                item={wednesday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '11:00:00',
                }}
                item={wednesday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '10:00:00',
                }}
                item={wednesday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '09:00:00',
                }}
                item={wednesday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Wednesday',
                  start_time: '08:00:00',
                }}
                item={wednesday.h_8_9}
              />
              <th className="align-middle">الإربعاء</th>
            </tr>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '16:00:00',
                }}
                item={thursday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '15:00:00',
                }}
                item={thursday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '14:00:00',
                }}
                item={thursday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '13:00:00',
                }}
                item={thursday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '12:00:00',
                }}
                item={thursday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '11:00:00',
                }}
                item={thursday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '10:00:00',
                }}
                item={thursday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '09:00:00',
                }}
                item={thursday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Thursday',
                  start_time: '08:00:00',
                }}
                item={thursday.h_8_9}
              />
              <th className="align-middle">الخميس</th>
            </tr>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '16:00:00',
                }}
                item={friday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '15:00:00',
                }}
                item={friday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '14:00:00',
                }}
                item={friday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '13:00:00',
                }}
                item={friday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '12:00:00',
                }}
                item={friday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '11:00:00',
                }}
                item={friday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '10:00:00',
                }}
                item={friday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '09:00:00',
                }}
                item={friday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Friday',
                  start_time: '08:00:00',
                }}
                item={friday.h_8_9}
              />
              <th className="align-middle">الجمعة</th>
            </tr>
            <tr>
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '16:00:00',
                }}
                item={saturday.h_16_17}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '15:00:00',
                }}
                item={saturday.h_15_16}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '14:00:00',
                }}
                item={saturday.h_14_15}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '13:00:00',
                }}
                item={saturday.h_13_14}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '12:00:00',
                }}
                item={saturday.h_12_13}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '11:00:00',
                }}
                item={saturday.h_11_12}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '10:00:00',
                }}
                item={saturday.h_10_11}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '09:00:00',
                }}
                item={saturday.h_9_10}
              />
              <Td
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  class_id: id,
                  weekday: 'Saturday',
                  start_time: '08:00:00',
                }}
                item={saturday.h_8_9}
              />
              <th className="align-middle">السبت</th>
            </tr>
          </tbody>
        </table>
      </div>
      <AddSessionByClassModal
        toadd={toAdd}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
      <EditSessionByClassModal
        toedit={toEdit}
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
        }}
      />
      <ReactToPrint
        trigger={() => (
          <button type="button" className="btn btn-primary m-2">
            Imprimer
          </button>
        )}
        content={() => componentRef.current}
      />
      <div className="print-source">
        <div
          ref={componentRef}
          className="container d-flex align-items-center justify-content-center p-5"
          style={{ fontSize: '16px' }}
        >
          <div>
            <div className="text-center mb-4">
              {classe.name ? classe.name : ''}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr className="bg-light-gray">
                    <th>16 - 17</th>
                    <th>15 - 16</th>
                    <th>14 - 15</th>
                    <th>13 - 14</th>
                    <th>12 - 13</th>
                    <th>11 - 12</th>
                    <th>10 - 11</th>
                    <th>9 - 10</th>
                    <th>8 - 9</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TdToPrint item={monday.h_16_17} />
                    <TdToPrint item={monday.h_15_16} />
                    <TdToPrint item={monday.h_14_15} />
                    <TdToPrint item={monday.h_13_14} />
                    <TdToPrint item={monday.h_12_13} />
                    <TdToPrint item={monday.h_11_12} />
                    <TdToPrint item={monday.h_10_11} />
                    <TdToPrint item={monday.h_9_10} />
                    <TdToPrint item={monday.h_8_9} />
                    <th className="align-middle">الإثنين</th>
                  </tr>
                  <tr>
                    <TdToPrint item={tuesday.h_16_17} />
                    <TdToPrint item={tuesday.h_15_16} />
                    <TdToPrint item={tuesday.h_14_15} />
                    <TdToPrint item={tuesday.h_13_14} />
                    <TdToPrint item={tuesday.h_12_13} />
                    <TdToPrint item={tuesday.h_11_12} />
                    <TdToPrint item={tuesday.h_10_11} />
                    <TdToPrint item={tuesday.h_9_10} />
                    <TdToPrint item={tuesday.h_8_9} />
                    <th className="align-middle">الثلاثاء</th>
                  </tr>
                  <tr>
                    <TdToPrint item={wednesday.h_16_17} />
                    <TdToPrint item={wednesday.h_15_16} />
                    <TdToPrint item={wednesday.h_14_15} />
                    <TdToPrint item={wednesday.h_13_14} />
                    <TdToPrint item={wednesday.h_12_13} />
                    <TdToPrint item={wednesday.h_11_12} />
                    <TdToPrint item={wednesday.h_10_11} />
                    <TdToPrint item={wednesday.h_9_10} />
                    <TdToPrint item={wednesday.h_8_9} />
                    <th className="align-middle">الإربعاء</th>
                  </tr>
                  <tr>
                    <TdToPrint item={thursday.h_16_17} />
                    <TdToPrint item={thursday.h_15_16} />
                    <TdToPrint item={thursday.h_14_15} />
                    <TdToPrint item={thursday.h_13_14} />
                    <TdToPrint item={thursday.h_12_13} />
                    <TdToPrint item={thursday.h_11_12} />
                    <TdToPrint item={thursday.h_10_11} />
                    <TdToPrint item={thursday.h_9_10} />
                    <TdToPrint item={thursday.h_8_9} />
                    <th className="align-middle">الخميس</th>
                  </tr>
                  <tr>
                    <TdToPrint item={friday.h_16_17} />
                    <TdToPrint item={friday.h_15_16} />
                    <TdToPrint item={friday.h_14_15} />
                    <TdToPrint item={friday.h_13_14} />
                    <TdToPrint item={friday.h_12_13} />
                    <TdToPrint item={friday.h_11_12} />
                    <TdToPrint item={friday.h_10_11} />
                    <TdToPrint item={friday.h_9_10} />
                    <TdToPrint item={friday.h_8_9} />
                    <th className="align-middle">الجمعة</th>
                  </tr>
                  <tr>
                    <TdToPrint item={saturday.h_16_17} />
                    <TdToPrint item={saturday.h_15_16} />
                    <TdToPrint item={saturday.h_14_15} />
                    <TdToPrint item={saturday.h_13_14} />
                    <TdToPrint item={saturday.h_12_13} />
                    <TdToPrint item={saturday.h_11_12} />
                    <TdToPrint item={saturday.h_10_11} />
                    <TdToPrint item={saturday.h_9_10} />
                    <TdToPrint item={saturday.h_8_9} />
                    <th className="align-middle">السبت</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

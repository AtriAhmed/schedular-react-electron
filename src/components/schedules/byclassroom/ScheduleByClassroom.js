/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import ReactToPrint from 'react-to-print';
import LoadingCmp from '../../LoadingCmp';
import AddSessionByClassroomModal from './AddSessionByClassroomModal';
import EditSessionByClassroomModal from './EditSessionByClassroomModal';
import TdClassroom from './TdClassroom';
import TdToPrint from './TdToPrintByClassroom';
import '../ToPrint.css';

export default function ScheduleByClassroom() {
  const [fontsize, setFontsize] = useState(12);

  const handleFontsize = (e) => {
    e.persist();
    setFontsize(e.target.value);
  };

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
  const componentRef = useRef();
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

  function refreshItems() {
    /* axios.get(`/api/sessions-by-classroom/${id}`).then(res=>{if(res.data.status === 200){setItemsList(res.data.items);}}); */
  }
  const [toAdd, setToAdd] = useState({});
  const [toEdit, setToEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [classroom, setClassroom] = useState({});

  useEffect(() => {
    db.classrooms.get(Number.parseInt(id)).then((res) => {
      if (res) setClassroom(res);
    });
  }, [id]);

  const [itemsList, setItemsList] = useState([]);

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

  const setItems = (items) => {
    setItemsList(items);
  };

  const sessions = useLiveQuery(() =>
    db.sessions.where('classroom_id').equals(Number.parseInt(id)).toArray()
  );
  useEffect(() => {
    if (sessions) {
      setItemsList(sessions);
      setLoading(false);
    } else {
      setItemsList([]);
      setLoading(false);
    }
  }, [sessions]);

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

  if (loading) {
    return <LoadingCmp />;
  }

  return (
    <div className="container">
      <div className="text-secondary">
        <Link className="text-decoration-none text-secondary" to="/home">
          <i className="fas fa-home" /> Home
        </Link>{' '}
        {'>>'}{' '}
        <Link className="text-decoration-none text-secondary" to="/schedules">
          {' '}
          Emplois{' '}
        </Link>{' '}
        {'>>'}{' '}
        <Link
          className="text-decoration-none text-secondary"
          to="/schedules/schedules-by-classroom"
        >
          emploie par salle
        </Link>{' '}
        {'>>'} {classroom.name ? classroom.name : ''}{' '}
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
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '16:00:00',
                }}
                item={monday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '15:00:00',
                }}
                item={monday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '14:00:00',
                }}
                item={monday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '13:00:00',
                }}
                item={monday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '12:00:00',
                }}
                item={monday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '11:00:00',
                }}
                item={monday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '10:00:00',
                }}
                item={monday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '09:00:00',
                }}
                item={monday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Monday',
                  start_time: '08:00:00',
                }}
                item={monday.h_8_9}
              />
              <th className="align-middle">الإثنين</th>
            </tr>
            <tr>
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '16:00:00',
                }}
                item={tuesday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '15:00:00',
                }}
                item={tuesday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '14:00:00',
                }}
                item={tuesday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '13:00:00',
                }}
                item={tuesday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '12:00:00',
                }}
                item={tuesday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '11:00:00',
                }}
                item={tuesday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '10:00:00',
                }}
                item={tuesday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '09:00:00',
                }}
                item={tuesday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Tuesday',
                  start_time: '08:00:00',
                }}
                item={tuesday.h_8_9}
              />
              <th className="align-middle">الثلاثاء</th>
            </tr>
            <tr>
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '16:00:00',
                }}
                item={wednesday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '15:00:00',
                }}
                item={wednesday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '14:00:00',
                }}
                item={wednesday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '13:00:00',
                }}
                item={wednesday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '12:00:00',
                }}
                item={wednesday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '11:00:00',
                }}
                item={wednesday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '10:00:00',
                }}
                item={wednesday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '09:00:00',
                }}
                item={wednesday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Wednesday',
                  start_time: '08:00:00',
                }}
                item={wednesday.h_8_9}
              />
              <th className="align-middle">الإربعاء</th>
            </tr>
            <tr>
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '16:00:00',
                }}
                item={thursday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '15:00:00',
                }}
                item={thursday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '14:00:00',
                }}
                item={thursday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '13:00:00',
                }}
                item={thursday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '12:00:00',
                }}
                item={thursday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '11:00:00',
                }}
                item={thursday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '10:00:00',
                }}
                item={thursday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '09:00:00',
                }}
                item={thursday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Thursday',
                  start_time: '08:00:00',
                }}
                item={thursday.h_8_9}
              />
              <th className="align-middle">الخميس</th>
            </tr>
            <tr>
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '16:00:00',
                }}
                item={friday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '15:00:00',
                }}
                item={friday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '14:00:00',
                }}
                item={friday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '13:00:00',
                }}
                item={friday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '12:00:00',
                }}
                item={friday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '11:00:00',
                }}
                item={friday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '10:00:00',
                }}
                item={friday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '09:00:00',
                }}
                item={friday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Friday',
                  start_time: '08:00:00',
                }}
                item={friday.h_8_9}
              />
              <th className="align-middle">الجمعة</th>
            </tr>
            <tr>
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '16:00:00',
                }}
                item={saturday.h_16_17}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '15:00:00',
                }}
                item={saturday.h_15_16}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '14:00:00',
                }}
                item={saturday.h_14_15}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '13:00:00',
                }}
                item={saturday.h_13_14}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '12:00:00',
                }}
                item={saturday.h_12_13}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '11:00:00',
                }}
                item={saturday.h_11_12}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '10:00:00',
                }}
                item={saturday.h_10_11}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
                  weekday: 'Saturday',
                  start_time: '09:00:00',
                }}
                item={saturday.h_9_10}
              />
              <TdClassroom
                setitems={setItems}
                settoadd={setToAddChild}
                settoaddmodal={setToAddModal}
                settoedit={setToEditChild}
                settoeditmodal={setToEditModal}
                data={{
                  classroom_id: id,
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

      <AddSessionByClassroomModal
        toadd={toAdd}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          refreshItems();
        }}
      />
      <EditSessionByClassroomModal
        toedit={toEdit}
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
          refreshItems();
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
          style={{
            height: '794px',
            width: '1123px',
            fontSize: `${fontsize}px`,
          }}
        >
          <div>
            <div className="text-center mb-4">
              {classroom.name ? classroom.name : ''}
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
      <div className="form-group">
        <label>Sélectionner taille de police</label>
        <div className="input-group mb-3">
          <select
            name="classroom_id"
            onChange={handleFontsize}
            value={fontsize}
            className="form-control"
          >
            <option value={16}>16</option>
            <option value={14}>14</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
    </div>
  );
}

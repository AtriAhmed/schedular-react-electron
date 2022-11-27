/* eslint-disable import/no-unresolved */
import Classes from 'components/classes/Classes';
import Classrooms from 'components/classrooms/Classrooms';
import Home from 'components/Home';
import Layout from 'components/Layout';
import ScheduleByClass from 'components/schedules/byclass/ScheduleByClass';
import SchedulesByClass from 'components/schedules/byclass/SchedulesByClass';
import ScheduleByClassroom from 'components/schedules/byclassroom/ScheduleByClassroom';
import SchedulesByClassroom from 'components/schedules/byclassroom/SchedulesByClassroom';
import ScheduleByTeacher from 'components/schedules/byteacher/ScheduleByTeacher';
import SchedulesByTeacher from 'components/schedules/byteacher/SchedulesByTeacher';
import Schedules from 'components/schedules/Schedules';
import Subjects from 'components/subjects/Subjects';
import Teachers from 'components/teachers/Teachers';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Export from 'components/export-import/Export';

library.add(fas);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/classrooms" element={<Classrooms />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route
            path="/schedules/schedules-by-class"
            element={<SchedulesByClass />}
          />
          <Route
            path="/schedules/schedules-by-class/:id"
            element={<ScheduleByClass />}
          />
          <Route
            path="/schedules/schedules-by-teacher"
            element={<SchedulesByTeacher />}
          />
          <Route
            path="/schedules/schedules-by-teacher/:id"
            element={<ScheduleByTeacher />}
          />
          <Route
            path="/schedules/schedules-by-classroom"
            element={<SchedulesByClassroom />}
          />
          <Route
            path="/schedules/schedules-by-classroom/:id"
            element={<ScheduleByClassroom />}
          />
          <Route path="/export" element={<Export />} />
        </Route>
      </Routes>
    </Router>
  );
}

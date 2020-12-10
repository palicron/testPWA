function calculateActivityAverage(stats) {
  let qtys = [0,0,0,0];

  stats.forEach(stat => {
    stat.actividades.forEach(activity => {
      let average = activity.sumNotas/activity.totalNotas;
      if (average > 4.6) qtys[0]++;
      else if (average > 4) qtys[1]++;
      else if (average > 3.4) qtys[2]++;
      else if (average >= 0) qtys[3]++;
    });
  });

  return qtys;
}

function calculateActivitySubmissions(statsA, statsS, oneCourse) {
  let qtys = [0,0,0,0];

  statsA.forEach(stat => {
    let totalStudents = 0;
    if(oneCourse){
      statsS.forEach(student => {
        if (student.curso == stat.curso) totalStudents++;
      });
    } else {
      totalStudents = statsS.length;
    }

    stat.actividades.forEach(activity => {
      let percentage = activity.totalEntregas/totalStudents;
      if (percentage == 1) qtys[0]++;
      else if (percentage >= 0.5) qtys[1]++;
      else if (percentage > 0) qtys[2]++;
      else if (percentage == 0) qtys[3]++;
    });
  });

  return qtys;
}

function calculateActivityGraded(stats) {
  let qtys = [0,0,0,0];

  stats.forEach(stat => {
    stat.actividades.forEach(activity => {
      let percentage = activity.totalNotas/activity.totalEntregas;
      if (percentage == 1) qtys[0]++;
      else if (percentage >= 0.5) qtys[1]++;
      else if (percentage > 0) qtys[2]++;
      else if (percentage == 0) qtys[3]++;
    });
  });

  return qtys;
}

function calculateStudentAverage(stats, idSubject) {
  let qtys = [0,0,0,0];
  stats.forEach(student => {
    let subject = student.materias.find(stat => stat.idMateria == idSubject);
    let averagePercentage = subject.sumNotas/subject.totalNotas;
    let average = averagePercentage*100/subject.porcentajeNotas;
    if (average > 4.6) qtys[0]++;
    else if (average > 4) qtys[1]++;
    else if (average > 3.4) qtys[2]++;
    else if (average >= 0) qtys[3]++;
  });
  return qtys;
}

function calculateStudentSubmissions(statsStudent, statsActivity, idProfesor, idSubject) {
  let qtys = [0,0,0,0];

  statsStudent.forEach(student => {
    let totalSubmissions = 0;
    let totalActivities = 0;
    student.materias.forEach(subject => {
      let isRequested = subject.idProfesor == idProfesor;
      isRequested &= idMateria != -1? subject.idMateria == idSubject : true;
      if (isRequested) {
        let statsSubject = statsActivity.filter(stat => stat.materia == subject.idMateria);
        totalActivities += statsSubject.actividades.length;
        totalSubmissions += subject.totalEntregas;
      }
    });
    let percentage = totalSubmissions/totalActivities;
    if (percentage == 1) qtys[0]++;
    else if (percentage >= 0.5) qtys[1]++;
    else if (percentage > 0) qtys[2]++;
    else if (percentage == 0) qtys[3]++;
  });
  return qtys;
}

exports.activitySubmissions = calculateActivitySubmissions;
exports.activityAverage = calculateActivityAverage;
exports.activityGraded = calculateActivityGraded;
exports.studentAverage = calculateStudentAverage;
exports.studentSubmissions = calculateStudentSubmissions;

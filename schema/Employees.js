cube(`Employees`, {
  sql: `SELECT * FROM employees.employees`,

  measures: {
    count: {
      sql: 'emp_no',
      type: `count`,
    },
  },

  dimensions: {
    firstName: {
      sql: `first_name`,
      type: `string`
    },

    hireDate: {
      sql: `hire_date`,
      type: `time`
    },

    id: {
      sql: 'emp_no',
      type: `number`,
      primaryKey: true,
    }
  },

  joins: {
    DepartmentsEmployees: {
      relationship: `belongsTo`,
      sql: `${DepartmentsEmployees}.emp_no = ${Employees}.emp_no`
    }
  }
});

cube(`Departments`, {
  sql: 'SELECT * FROM employees.departments',

  measures: {
    count: {
      sql: 'dept_no',
      type: `count`,
    },
  },

  dimensions: {
    id: {
      sql: 'dept_no',
      type: `number`,
      primaryKey: true,
    }
  }
});

cube(`DepartmentsEmployees`, {
  sql: 'SELECT * FROM employees.dept_emp',

  measures: {
    count: {
      sql: 'emp_no',
      type: `count`,
    },
  },

  joins: {
    Departments: {
      relationship: `hasMany`,
      sql: `${DepartmentsEmployees}.dept_no = ${Departments}.dept_no`
    }
  },

  dimensions: {
    id: {
      sql: `CONCAT(${DepartmentsEmployees}.dept_no, ${DepartmentsEmployees}.emp_no)`,
      type: `number`,
      primaryKey: true
    },

    hireDate: {
      sql: 'hire_date',
      type: 'time',
    },

    departmentNo: {
      sql: 'dept_no',
      type: 'number'
    }
  },
})

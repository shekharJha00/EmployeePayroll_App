window.addEventListener('DOMContentLoaded',() =>{
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
  });
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
      if(name.value.length == 0){
        textError.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
    }
    catch(ex){
        textError.textContent = ex;
    }
    }); 
  });
  
  
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  }

  const save = () => {
    try
    {
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
    } 
    catch(ex)
    {
      return;
    }
  }

  const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
      employeePayrollData.name = getInputValueById('#name');
    }catch(ex){
      setTextValue('.text-error',ex);
      throw ex;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
  }

  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
      if(item.checked) setItems.push(item.value);
    });
    return setItems;
  }

  function createAndUpdateStorage(EmpPayrollData){
    let empPayrollList = JSON.parse(localStorage.getItem("empPayrollList"));

    if(empPayrollList != undefined){
        empPayrollList.push(EmpPayrollData);
    } else{
        empPayrollList = [EmpPayrollData]
    }
    alert(empPayrollList.toString());
    localStorage.setItem("empPayrollList", JSON.stringify(empPayrollList))
  }

  const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setTextValue('.salary-output', 400000);
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
    setTextValue('.text-error', '');
  }
  const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false
    });
  }
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  }

  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  }  
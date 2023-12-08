// const frontEnd = 'front end f32'
// const age = 1

//! записує дані
// localStorage.setItem('group', frontEnd)
// localStorage.setItem('age', age)


//! получити дані
// console.log(localStorage.getItem('group'));
// console.log(localStorage.getItem('age'));



//! видалення даних

// localStorage.removeItem('age')


//! видалити все 

// localStorage.clear()


//? object
// const frontEnd = {
//    groupName: 'front end 32',
//    age: 1,
// }

//====================================
// localStorage.setItem('objectTest', frontEnd)
// console.log(localStorage.getItem('objectTest'));
//====================================

// localStorage.setItem('obj', JSON.stringify(frontEnd))
// console.log();

// const objStr = JSON.parse(localStorage.getItem('obj'))
// console.log(objStr);






//! ==========================

class User {
   constructor(firstName, lastName, date, email, password, confirm_password){
      this.firstName = firstName;
      this.lastName = lastName;
      this.date = date;
      this.email = email;
      this.password = password;
      this.confirm_password = confirm_password;
   }

   register(){
      if(this.firstName.length < 1){
         alert(`Поле 'Імя користувача' повино містити хоча б один символ`)
         return
      }
      if(this.lastName.length < 1){
         alert(`Поле 'Прізвище користувача' повино містити хоча б один символ`)
         return
      }
      if(this.date.length < 1){
         alert(`Поле 'Дата народження' є обовязковим`)
         return
      }
      if(this.email.length < 1){
         alert(`Поле 'Email' є обовязковим`)
         return
      }
      if(this.password.length < 6){
         alert(`Пароль повинен бути довжиною від 6 символів`)
         return
      }
      if(this.confirm_password !== this.password){
         alert(`Паролі не рівні`)
         return
      }

      localStorage.setItem(this.email, JSON.stringify(this))
      alert('Регестрація успішна')
      registrationForm.style.display = 'none'
      loginForm.style.display = 'block'
   }
}

const registrationForm = document.getElementById('registrationForm')
const loginForm = document.getElementById('loginForm')
let logInEmailNow 

registrationForm.addEventListener('submit', (event) => {
   event.preventDefault()

   const firstName = document.getElementById('firstName').value
   const lastName = document.getElementById('lastName').value
   const date = document.getElementById('date').value
   const email = document.getElementById('email').value
   const password = document.getElementById('password').value
   const confirm_password = document.getElementById('confirm_password').value

   const user = new User(firstName,lastName,date,email,password,confirm_password)
   user.register()
})


const registerBtn = document.getElementById('registerBtn')
registerBtn.addEventListener('click', () => {
   registrationForm.style.display = 'block'
   loginForm.style.display = 'none'
})


loginForm.addEventListener('submit', (event)=> {
   event.preventDefault()
 
   const logInEmail = document.getElementById('logInEmail').value
   const logInPassword = document.getElementById('logInPassword').value
 
   const userData = localStorage.getItem(logInEmail)
   
   if(userData){
     const user = JSON.parse(userData)
     if (user.password === logInPassword) {
         alert(`Вхід успішний. Користувач ${user.firstName} ${user.lastName}` ) 
         loginForm.style.display = 'none'
         const userData = document.querySelector('.userData').style.display = 'block'
         localStorage.setItem('logInEmailNowLoc', logInEmail)
         document.querySelector('#firstNameIn').textContent = JSON.parse(localStorage.getItem(logInEmail)).firstName
         document.querySelector('#lastNameIn').textContent = JSON.parse(localStorage.getItem(logInEmail)).lastName
         document.querySelector('#dateIn').textContent = JSON.parse(localStorage.getItem(logInEmail)).date
         document.querySelector('#emailIn').textContent = JSON.parse(localStorage.getItem(logInEmail)).email
         document.querySelector('#passwordIn').textContent = JSON.parse(localStorage.getItem(logInEmail)).password
         return logInEmailNow = logInEmail
     } else {
       alert('Не вірний пароль')
     }
   }else{
     alert(`Користувача з таким email: ${logInEmail} не існує` )
   }
 })


const goToLogInBtn = document.getElementById('goToLogInBtn')

goToLogInBtn.addEventListener('click', ()=>{
  loginForm.style.display = 'block'
  registrationForm.style.display = 'none'
})

document.querySelector('#deletAkBtn').addEventListener('click', () => {
   const exam = window.prompt('Введіть свій пароль для підтвердження')
   if(exam === JSON.parse(localStorage.getItem(logInEmailNow)).password){
      localStorage.removeItem(logInEmailNow)
      localStorage.removeItem('logInEmailNowLoc')
      location.reload()
      alert(`Акаунт ${logInEmailNow} видалений`)
   }else {
      alert('Неправильний пароль!')
   }

})
document.querySelector('#dislogBtn').addEventListener('click', () => {
   console.log('d');
   localStorage.removeItem('logInEmailNowLoc')
   location.reload()
})

addEventListener('DOMContentLoaded', ()=>{
   const userData = document.querySelector('.userData')
   const logData = localStorage.getItem('logInEmailNowLoc')
   if(localStorage.getItem('logInEmailNowLoc') !== null){
      loginForm.style.display = 'none'
      userData.style.display = 'block'
      document.querySelector('#firstNameIn').textContent = JSON.parse(localStorage.getItem(logData)).firstName
      document.querySelector('#lastNameIn').textContent = JSON.parse(localStorage.getItem(logData)).lastName
      document.querySelector('#dateIn').textContent = JSON.parse(localStorage.getItem(logData)).date
      document.querySelector('#emailIn').textContent = JSON.parse(localStorage.getItem(logData)).email
      document.querySelector('#passwordIn').textContent = JSON.parse(localStorage.getItem(logData)).password
   }
})
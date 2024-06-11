// import { app, db } from "./Firebase.mjs";
// import { collection, getDocs, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// var id = 1;
// document.addEventListener('DOMContentLoaded', () => {
//     var signupBtn = document.querySelector('#registerForm button#btn');
//     if (signupBtn) {
//         signupBtn.addEventListener('click', async function (event) {
//             event.preventDefault();

//             var errorMessage = document.querySelector('#error-message');
//             errorMessage.textContent = '';

//             var name = document.querySelector('#name').value.trim();
//             var email = document.querySelector('#mail').value.trim();
//             var password = document.querySelector('#password').value.trim();
//             var age;
//             if (document.querySelector('#under_18').checked) {
//                 age = document.querySelector('#under_18').value;
//             } else if (document.querySelector('#over_18').checked) {
//                 age = document.querySelector('#over_18').value;
//             }
//             var bio = document.querySelector('#bio').value.trim();
//             var job = document.querySelector('#job').value;
//             var interests = [];
//             if (document.querySelector('#development').checked) {
//                 interests.push(document.querySelector('#development').value);
//             }
//             if (document.querySelector('#design').checked) {
//                 interests.push(document.querySelector('#design').value);
//             }
//             if (document.querySelector('#business').checked) {
//                 interests.push(document.querySelector('#business').value);
//             }

//             // Validation
//             if (!name) {
//                 errorMessage.textContent = 'Name is required.';
//                 return;
//             }
//             if (!email) {
//                 errorMessage.textContent = 'Email is required.';
//                 return;
//             }
//             if (!email.includes('@')) {
//                 errorMessage.textContent = 'Email must contain an "@" symbol.';
//                 return;
//             }
//             if (!password) {
//                 errorMessage.textContent = 'Password is required.';
//                 return;
//             }
//             if (password.length < 8) {
//                 errorMessage.textContent = 'Password must be at least 8 characters long.';
//                 return;
//             }
//             if (!age) {
//                 errorMessage.textContent = 'Age selection is required.';
//                 return;
//             }
//             if (!bio) {
//                 errorMessage.textContent = 'Biography is required.';
//                 return;
//             }
//             if (!job) {
//                 errorMessage.textContent = 'Job role is required.';
//                 return;
//             }
//             if (interests.length === 0) {
//                 errorMessage.textContent = 'At least one interest must be selected.';
//                 return;
//             }

//             var user = {
//                 name: name,
//                 email: email,
//                 password: password,
//                 age: age,
//                 bio: bio,
//                 job: job,
//                 interests: interests
//             };

//             // try {
//             //     const docRef = await addDoc(collection(db, "users"), user);
//             //     setTimeout(()=>{
//             //         window.location.href = 'login.html';
//             //     },1500)
//             //     console.log("Document written with ID: ", docRef.id);
//             // } catch (e) {
//             //     console.error("Error adding document: ", e);
//             //     errorMessage.textContent = 'Error adding document: ' + e.message;
//             // }


//             try {
//                 const docRef = await setDoc(doc(db, "All Users", id), {
//                     setTimeout(await ()=>{
//                                 window.location.href = 'login.html';
//                             },1500)
//                 console.log("Document written with ID: ", docRef.id);
//                   }); 
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//                 errorMessage.textContent = 'Error adding document: ' + e.message;
//             }

//             // Signup user Authentication
//             const auth = getAuth();
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     console.log("User created:", userCredential.user);
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     console.error(errorCode, errorMessage);
//                     document.querySelector('#error-message').textContent = 'Error creating user: ' + errorMessage;
//                 });

//                 id++;
//         });
//     }

//     // Login user Authentication
//     var loginBtn = document.querySelector('#loginForm button#login-btn');
//     if (loginBtn) {
//         loginBtn.addEventListener('click', function (event) {
//             event.preventDefault();
//             var loginEmail = document.querySelector('#login-email').value;
//             var loginPass = document.querySelector('#login-password').value;

//             const auth = getAuth();
//             signInWithEmailAndPassword(auth, loginEmail, loginPass)
//                 .then(async (userCredential) => {
//                     const user = userCredential.user;
//                     document.querySelector('#login-error-message').textContent = "Successfully Logged in"
//                     setTimeout(()=>{
//                         window.location.href = 'data.html';
//                     },1500)
//                     console.log(user);
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     console.error(errorCode, errorMessage);
//                     document.querySelector('#login-error-message').textContent = 'Error: ' + errorMessage;
//                 });
//         });
//     }
// });

// export async function fetchData() {
//     const tableBody = document.querySelector('#table-body');

//     try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             const row = document.createElement('tr');

//             row.innerHTML = `
//                 <td>${data.name}</td>
//                 <td>${data.email}</td>
//                 <td>${data.password}</td>
//                 <td>${data.bio}</td>
//                 <td>${data.age}</td>
//                 <td>${data.interests.join(', ')}</td>
//                 <td><Button id="edit-btn"><span>Edit</span></Button></td>
//                 <td><Button id="delete-btn"><span>Delete</span></Button></td>
//             `;

//             tableBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }

// // Call fetchData when the data.html is loaded
// if (window.location.pathname.endsWith('data.html')) {
//     document.addEventListener('DOMContentLoaded', fetchData);
// }












import { app, db } from "./Firebase.mjs";
import { collection, getDocs, addDoc, setDoc, doc, query, orderBy, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

async function getNextUserId() {
    const usersRef = collection(db, "All-users");
    const q = query(usersRef, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const lastUser = querySnapshot.docs[0].data();
        return lastUser.id + 1;
    } else {
        return 1; // If no users exist, start with id 1
    }
}

document.addEventListener('DOMContentLoaded', () => {
    var signupBtn = document.querySelector('#registerForm button#btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', async function (event) {
            event.preventDefault();

            var errorMessage = document.querySelector('#error-message');
            errorMessage.textContent = '';

            var name = document.querySelector('#name').value.trim();
            var email = document.querySelector('#mail').value.trim();
            var password = document.querySelector('#password').value.trim();
            var age;
            if (document.querySelector('#under_18').checked) {
                age = document.querySelector('#under_18').value;
            } else if (document.querySelector('#over_18').checked) {
                age = document.querySelector('#over_18').value;
            }
            var bio = document.querySelector('#bio').value.trim();
            var job = document.querySelector('#job').value;
            var interests = [];
            if (document.querySelector('#development').checked) {
                interests.push(document.querySelector('#development').value);
            }
            if (document.querySelector('#design').checked) {
                interests.push(document.querySelector('#design').value);
            }
            if (document.querySelector('#business').checked) {
                interests.push(document.querySelector('#business').value);
            }

            // Validation
            if (!name) {
                errorMessage.textContent = 'Name is required.';
                return;
            }
            if (!email) {
                errorMessage.textContent = 'Email is required.';
                return;
            }
            if (!email.includes('@')) {
                errorMessage.textContent = 'Email must contain an "@" symbol.';
                return;
            }
            if (!password) {
                errorMessage.textContent = 'Password is required.';
                return;
            }
            if (password.length < 8) {
                errorMessage.textContent = 'Password must be at least 8 characters long.';
                return;
            }
            if (!age) {
                errorMessage.textContent = 'Age selection is required.';
                return;
            }
            if (!bio) {
                errorMessage.textContent = 'Biography is required.';
                return;
            }
            if (!job) {
                errorMessage.textContent = 'Job role is required.';
                return;
            }
            if (interests.length === 0) {
                errorMessage.textContent = 'At least one interest must be selected.';
                return;
            }

            var user = {
                name: name,
                email: email,
                password: password,
                age: age,
                bio: bio,
                job: job,
                interests: interests
            };

            try {
                // Get the next available id
                const id = await getNextUserId();
                user.id = id;

                await setDoc(doc(db, "All-users", String(id)), user);
                console.log("Document written with ID: ", id);

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } catch (e) {
                console.error("Error adding document: ", e);
                errorMessage.textContent = 'Error adding document: ' + e.message;
            }

            // Signup user Authentication
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("User created:", userCredential.user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                    document.querySelector('#error-message').textContent = 'Error creating user: ' + errorMessage;
                });
        });
    }

    // Login user Authentication
    var loginBtn = document.querySelector('#loginForm button#login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (event) {
            event.preventDefault();
            var loginEmail = document.querySelector('#login-email').value;
            var loginPass = document.querySelector('#login-password').value;

            const auth = getAuth();
            signInWithEmailAndPassword(auth, loginEmail, loginPass)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    document.querySelector('#login-error-message').textContent = "Successfully Logged in";
                    setTimeout(() => {
                        window.location.href = 'data.html';
                    }, 1500);
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                    document.querySelector('#login-error-message').textContent = 'Error: ' + errorMessage;
                });
        });
    }
});

export async function fetchData() {
    const tableBody = document.querySelector('#table-body');

    try {
        const querySnapshot = await getDocs(collection(db, "All-users"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                <td>${data.bio}</td>
                <td>${data.age}</td>
                <td>${data.interests.join(', ')}</td>
                <td><button id="edit-btn" class="edit">Edit</button></td>
                <td><button id="delete-btn" class="delete">Delete</button></td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        addDeleteEventListeners();

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}



function addDeleteEventListeners() {
    let deletes = document.querySelectorAll('button.delete');
    deletes.forEach((del) => {
        del.addEventListener('click', function (event) {
            const row = event.target.closest('tr');
            row.style.background = 'rgb(197, 94, 94)';
            const userId = row.querySelector('td').textContent;
            setTimeout(()=>{
                deleteUser(userId, row);
            },100)
           
        });
    });
}

async function deleteUser(id, row) {
    try {
        await deleteDoc(doc(db, "All-users", id));
        console.log(`Document with ID ${id} deleted.`);
        row.remove();
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

// Call fetchData when the data.html is loaded
if (window.location.pathname.endsWith('data.html')) {
    document.addEventListener('DOMContentLoaded', fetchData);
}

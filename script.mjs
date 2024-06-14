import { app, db } from "./Firebase.mjs";
import { collection, getDocs, setDoc, doc, query, orderBy, limit, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
        return 1;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('#registerForm button#btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', async function (event) {
            event.preventDefault();

            const errorMessage = document.querySelector('#error-message');
            errorMessage.textContent = '';

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#mail').value.trim();
            const password = document.querySelector('#password').value.trim();
            let age;
            if (document.querySelector('#under_18').checked) {
                age = document.querySelector('#under_18').value;
            } else if (document.querySelector('#over_18').checked) {
                age = document.querySelector('#over_18').value;
            }
            const bio = document.querySelector('#bio').value.trim();
            const job = document.querySelector('#job').value;
            const interests = [];
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

            const user = {
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
    const loginBtn = document.querySelector('#loginForm button#login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const loginEmail = document.querySelector('#login-email').value;
            const loginPass = document.querySelector('#login-password').value;

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

    tableBody.innerHTML = '';

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
                <td><button class="edit">Edit</button></td>
                <td><button class="delete">Delete</button></td>
            `;

            tableBody.appendChild(row);
        });

        addDeleteEventListeners();
        addEditEventListeners();
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function addDeleteEventListeners() {
    const deletes = document.querySelectorAll('button.delete');
    deletes.forEach((del) => {
        del.addEventListener('click', function (event) {
            const row = event.target.closest('tr');
            const userId = row.querySelector('td').textContent;
            row.style.background = 'rgb(197, 94, 94)';
            setTimeout(() => {
                deleteUser(userId, row);
            }, 100);
        });
    });
}

function addEditEventListeners() {
    const editButtons = document.querySelectorAll('.edit');
    const popup = document.querySelector('#update-popup');
    const popupContent = document.querySelector('.update-popup .popup');

    editButtons.forEach((editBtn) => {
        editBtn.addEventListener('click', async function () {
            const row = editBtn.closest('tr');
            const userId = row.querySelector('td:nth-child(1)').textContent;
            const userDoc = await getDoc(doc(db, "All-users", userId));
            const userData = userDoc.data();

            document.querySelector('.name').value = userData.name;
            document.querySelector('.mail').value = userData.email;
            document.querySelector('.password').value = userData.password;
            if (userData.age === 'under_18') {
                document.querySelector('#under_18').checked = true;
            } else {
                document.querySelector('#over_18').checked = true;
            }
            document.querySelector('.bio').value = userData.bio;
            document.querySelector('.job').value = userData.job;
            document.querySelectorAll('input[name="user_interest"]').forEach(checkbox => {
                checkbox.checked = userData.interests.includes(checkbox.value);
            });

            popup.style.display = 'flex';
            console.log("Edit Button Clicked...");
            editBtn.closest('tr').classList.add('editing');
        });
    });

    window.addEventListener('click', function (event) {
        if (popup.style.display === 'flex' && !popupContent.contains(event.target) && !event.target.classList.contains('edit')) {
            popup.style.display = 'none';
        }
    });

    document.querySelector('#update-btn').addEventListener('click', getEditDataFromInput);
}

async function updateUserData(userId, updateData) {
    try {
        await setDoc(doc(db, "All-users", userId), updateData, { merge: true });
        console.log(`Document with ID ${userId} updated.`);
        document.querySelector('#update-popup').style.display = 'none';
        fetchData();
    } catch (error) {
        console.error("Error updating document: ", error);
        const errorDiv = document.querySelector('#error');
        errorDiv.textContent = 'Error updating document: ' + error.message;
    }
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

if (window.location.pathname.endsWith('data.html')) {
    document.addEventListener('DOMContentLoaded', fetchData);
}

function getEditDataFromInput() {
    const errorDiv = document.querySelector('#error');
    errorDiv.textContent = '';

    const row = document.querySelector('tr.editing');
    if (!row) {
        console.error("Error: Could not find row with class 'editing'.");
        return;
    }

    const name = document.querySelector('.name').value.trim();
    const email = document.querySelector('.mail').value.trim();
    const password = document.querySelector('.password').value.trim();
    const age = document.querySelector('input[name="user_age"]:checked') ? document.querySelector('input[name="user_age"]:checked').value : '';
    const bio = document.querySelector('.bio').value.trim();
    const job = document.querySelector('.job').value;
    const interests = Array.from(document.querySelectorAll('input[name="user_interest"]:checked')).map(checkbox => checkbox.value);

    let hasErrors = false;

    if (name && name.length < 3) {
        errorDiv.textContent += 'Name must be at least 3 characters long.\n';
        hasErrors = true;
    }

    if (email && !email.includes('@')) {
        errorDiv.textContent += 'Email must contain @.\n';
        hasErrors = true;
    }

    if (password && password.length < 8) {
        errorDiv.textContent += 'Password must be at least 8 characters long.\n';
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    const userId = row.querySelector('td:nth-child(1)').textContent;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (age) updateData.age = age;
    if (bio) updateData.bio = bio;
    if (job) updateData.job = job;
    if (interests.length > 0) updateData.interests = interests;

    updateUserData(userId, updateData);
    console.log(updateData);
}


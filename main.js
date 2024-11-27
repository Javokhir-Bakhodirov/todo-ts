"use strict";
const $elForm = document.querySelector(".elForm");
const $elInput = document.querySelector(".elInput");
const $elList = document.querySelector(".elList");
const $editModal = document.getElementById("editModal");
const $editInput = document.getElementById("editInput");
const $saveBtn = document.getElementById("saveBtn");
const $cancelBtn = document.getElementById("cancelBtn");
const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
};
let toDoList = getLocalStorage("todo") || [];
const renderList = (arr, list) => {
    if (list) {
        list.innerHTML = "";
        arr.forEach((item, index) => {
            const $elListItem = document.createElement("li");
            list.appendChild($elListItem);
            $elListItem.className = `flex items-center justify-between p-4 rounded-lg mb-2 transition-all duration-300 ease-in-out transform ${(index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`;
            $elListItem.innerHTML = `
          <div class="flex items-center space-x-4">
            <span class="text-lg font-semibold text-gray-800">${index + 1}.</span>
            <strong class="text-xl text-gray-900 ${item.isComplete ? "text-gray-400 line-through" : ""}">${item.toDo}</strong>
          </div>
          <div class="flex space-x-5">
            <button class="text-blue-600 hover:text-blue-800 focus:outline-none" aria-label="Edit" onclick="openEditModal(${index})">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.854a2 2 0 0 1 2.828 2.828l-10 10A1 1 0 0 1 3 13L2 11a1 1 0 0 1 .146-1.354l10-10a2 2 0 0 1 1.854-.292z"/>
              </svg>
            </button>
            <button class="text-red-600 hover:text-red-800 focus:outline-none" aria-label="Delete" onclick="deleteFromList(${index})">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V1h1a.5.5 0 0 1 .5.5v.5h-12V1a.5.5 0 0 1 .5-.5h3zM4 4v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H4z"/>
              </svg>
            </button>
          </div>
          `;
        });
    }
};
let editingIndex = null;
const openEditModal = (index) => {
    editingIndex = index;
    $editInput.value = toDoList[index].toDo;
    $editModal.classList.remove("hidden");
};
const closeEditModal = () => {
    $editModal.classList.add("hidden");
    editingIndex = null;
};
const saveEdit = () => {
    if (editingIndex !== null && $editInput.value.trim() !== "") {
        toDoList[editingIndex].toDo = $editInput.value.trim();
        setLocalStorage("todo", toDoList);
        renderList(toDoList, $elList);
        closeEditModal();
    }
};
const deleteFromList = (index) => {
    toDoList.splice(index, 1);
    setLocalStorage("todo", toDoList);
    renderList(toDoList, $elList);
};
$saveBtn === null || $saveBtn === void 0 ? void 0 : $saveBtn.addEventListener("click", saveEdit);
$cancelBtn === null || $cancelBtn === void 0 ? void 0 : $cancelBtn.addEventListener("click", closeEditModal);
$elForm === null || $elForm === void 0 ? void 0 : $elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (($elInput === null || $elInput === void 0 ? void 0 : $elInput.value.trim()) !== "") {
        const newToDo = {
            toDo: $elInput.value.trim(),
            isComplete: false,
        };
        toDoList.push(newToDo);
        setLocalStorage("todo", toDoList);
        renderList(toDoList, $elList);
        $elInput.value = "";
    }
});
renderList(toDoList, $elList);

<template>
  <div class="add">
    <input
      type="text"
      placeholder="请输入待办事项"
      v-model="newTodo"
      class="input"
    />
    <button class="btn" @click="addTodo">添加</button>
  </div>
  <div class="List">
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input type="checkbox" class="check" v-model="todo.completed" />
        <label @dblclick="editTodo(todo)">{{ todo.content }}</label>
        <button class="delete" @click="removeTodo(todo.id)">X</button>
        <input
          v-if="todo.isEditing"
          type="text"
          class="Toedit"
          v-model="todo.content"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        />
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, reactive } from "vue";

const newTodo = ref(" ");
const todos = reactive([]);

//请求数据
var myHeaders = new Headers();
myHeaders.append("Authorization", `${localStorage.token}`);
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "http://127.0.0.1:3000/todo/get/list?content&over=不传/true/false&page=&size=",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    todos.unshift(...result.data);
    console.log(todos);
  })
  .catch((error) => console.log("error", error));

//添加待办的函数
const addTodo = async () => {
  const todoToAdd = {
    content: newTodo.value,
    over: false,
    create_time: "2024-04-04 18:20:25",
    resolves_time: "2024-04-04 18:20:28",
  };

  if (newTodo.value.trim()) {
    var raw = JSON.stringify(todoToAdd);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `${localStorage.token}`);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/todo/add/list",
        requestOptions
      );
      if (response.ok) {
        todos.push(todoToAdd);
        newTodo.value = ""; // 清空输入框
        // location.reload();
      } else {
        console.error("Failed to add todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
};
//删除待办的函数
const removeTodo = (id) => {
  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );
  //reactive 对象的值不能直接重新赋值，而是需要通过修改其内部属性来更新。
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `${localStorage.token}`);
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://127.0.0.1:3000/todo/delete/list/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

//编辑待办的函数
const editTodo = (todo) => {
  todo.isEditing = true;
};

const cancelEdit = (todo) => {
  todo.isEditing = false;
};

const doneEdit = (todo) => {
  if (todo.isEditing) {
    todo.isEditing = false;
    todo.content = todo.content.trim();
    if (!todo.content) {
      removeTodo(todo.id);
    }
    //发送请求
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `${localStorage.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: `${todo.content}`,
      over: false,
      create_time: "2024-04-04 18:20:21",
      resolves_time: "2024-04-04 18:20:21",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3000/todo/update/list/${todo.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
};
</script>

<style>
.add {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;
}
.btn {
  width: 50px;
  height: 40px;
  margin-left: 10px;
  background-color: #7fcbcf;
  color: rgb(2, 11, 21);
  border-radius: 10px;
  opacity: 0.8;
  font-weight: 500;
}
.List {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
ul {
  background-color: rgba(255, 255, 255, 0.523);
  width: 400px;
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}
li {
  position: relative;
  list-style: none;
  margin: 15px 0;
  background-color: #9bcccf;
  color: rgb(19, 55, 92);
  line-height: 40px;
  height: 50px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.check {
  width: 20px;
  height: 20px;
}
.completed {
  text-decoration: line-through;
  color: rgb(117, 155, 164);
}
.delete {
  height: 40px;
  width: 40px;
}

.Toedit {
  display: block;
  position: absolute;
  width: 250px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 1;
}
</style>

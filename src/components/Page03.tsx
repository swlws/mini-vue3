
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props) {
    let title = ref('')
    let todoList = ref([{ title: "吃饭", done: true },{ title: "睡觉", done: false },,{ title: "打豆豆", done: false }]);
    
    function addTodo(){
        todoList.value.push({
            title:title.value,
            done: false
        })
        title.value = ''
    }

    return () => 
      <div>
        <h1>this is a tsx page</h1>
          <input type="text" vModel={title.value} />
          <button onClick={addTodo}>click</button>
          <ul>
              {
                  todoList.value.length ? todoList.value.map(todo=>{
                      return <li>{todo?.title}</li>
                  }): <li>no data</li>
              }
          </ul>
      </div>
  }
})
<template>
  <div class="todo-page">
    <div class="header">
      <input type="text" v-model="newTitleText" placeholder="Add title..." @keydown.enter.prevent="addItem" />
      <input class="link" type="text" v-model="newLinkText" placeholder="Add link..." @keydown.enter.prevent="addItem" />
    </div>

    <div class="body">
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Info</th>
            <th>INT</th>
            <th>UAT</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="i" class="todo-list-item">
            <!-- project -->
            <td class="project">
              <select name="status" :id="`${i}-project`" v-model="item.project">
                <option v-for="(project, j) in projects" :key="`p-${j}`" v-text="project"></option>
              </select>
            </td>

            <!-- Info -->
            <td class="info">
              <a v-if="item.link" :href="item.link" class="title" v-text="item.title"></a>
              <span v-else class="title" v-text="item.title"></span>
              <!-- <a v-for="(link, j) in item.links" :key="`i-${j}`" v-text="link" :href="link"></a> -->
            </td>

            <!-- Verified in INT -->
            <td>
              <input type="checkbox" v-model="item.onINT" :id="`${i}-onINT`" />
            </td>

            <!-- Verified in UAT -->
            <td>
              <input type="checkbox" v-model="item.onUAT" :id="`${i}-onUAT`" />
            </td>

            <!-- Rating -->
            <td>
              <rating v-model="item.rating" />
            </td>

            <!-- Status -->
            <td class="links">
              <!-- status -->
              <select name="status" :id="`${i}-status`" v-model="item.status">
                <option v-for="(option, j) in statuses" :key="`s-${j}`" v-text="option"></option>
              </select>
            </td>

            <!-- link -->
            <td class="link">
              <input type="text" v-model="item.link" />
            </td>

            <!-- Remove -->
            <td class="links">
              <button @click="removeItem(i)">remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Todo from '@/assets/todo.json'
import Rating from '@/components/Rating'
import { writeData, readData } from './FireBaseService'

export default {
  name: 'todo-page',
  components: {
    Rating,
  },
  data() {
    return {
      newTitleText: '',
      newLinkText: '',
      open: false,
      projects: ['STRAP', 'ComboMatch'],
      statuses: ['Selected', 'In Progress', 'Waiting on QA', 'Waiting on UAT', 'Question', 'Done'],
      items: [],
    }
  },
  async mounted() {
    this.items = await readData()
  },
  methods: {
    addItem() {
      this.items.push(createDefeaultItem(this.newTitleText, this.newLinkText))
      this.newTitleText = ''
      this.newLinkText = ''
      writeData(this.items)
    },
    removeItem(i) {
      this.items.splice(i, 1)
    },
  },
  watch: {
    items: {
      handler() {
        writeData(this.items)
      },
      deep: true,
    },
  },
}

function createDefeaultItem(title, link = '') {
  return {
    id: Math.floor(Math.random() * 100),
    title,
    project: 'ComboMatch',
    status: 'Selected',
    description: '',
    links: [],
    link,
    onINT: false,
    onUAT: false,
    rating: 3,
  }
}
</script>

<style lang="scss" scoped>
.todo-page {
  // display: flex;
  padding: 0 3rem;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 200px;
  border-bottom: solid thin fade-out(black, 0.85);

  input {
    min-width: 500px;
    height: 40px;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  input.link {
    min-width: 300px;
    height: 30px;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
}
.body {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}

thead {
  border-bottom: 1px solid fade-out(black, 0.9);
}
tbody {
  tr {
    border-bottom: 1px solid fade-out(black, 0.95);
  }
  .info {
    min-width: 300px;
  }
  .link input {
    width: 100px;
  }
}
th,
td {
  padding: 0.75rem 1rem;
}
.todo-body {
}
</style>
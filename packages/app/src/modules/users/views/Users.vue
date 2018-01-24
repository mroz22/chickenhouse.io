<template>
  <div>
    <h1>Users</h1>
    <mu-table>
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">#</mu-th>
          <mu-th tooltip="">Email</mu-th>
          <mu-th tooltip="">Admin</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="user in users" :key="user['.key']" :selected="user.selected">
          <mu-td> </mu-td>
          <mu-td>
            {{user.email }}
          </mu-td>
          <mu-td>
            <mu-checkbox :label="user.isAdmin ? 'Ano' : 'Ne'" v-model="user.isAdmin"
            v-on:change="updateObject(user, !user.isAdmin)"/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
      <mu-tfoot slot="footer">
        <mu-tr>
          <mu-td>#</mu-td>
          <mu-td>Email</mu-td>
          <mu-td>Admin</mu-td>
        </mu-tr>
      </mu-tfoot>
    </mu-table>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '@/initFirebase'
  import { FirebaseError } from '@/errors'

  export default {
    computed: {
      ...mapGetters(['users'])
    },
    methods: {
      async updateObject (user, isAdmin) {
        try {
          await db.ref(`users/${user['.key']}`).update({ isAdmin: isAdmin })
        } catch (err) {
          this.$emit('error', new FirebaseError(err))
        }
      }
    },
    created () {
      this.$store.dispatch('setUsersRef', db.ref(`users`))
    }
  }
</script>

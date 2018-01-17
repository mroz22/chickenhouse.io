<template>
  <div>
    <h1>Users</h1>
    {{ users }}
    <!--
    :fixedFooter="fixedFooter" :fixedHeader="fixedHeader" :height="height"
              :enableSelectAll="enableSelectAll" :multiSelectable="multiSelectable"
              :selectable="selectable" :showCheckbox="showCheckbox"
    -->
    <mu-table>
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">#</mu-th>
          <mu-th tooltip="">Email</mu-th>
          <mu-th tooltip="">Admin</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(user, uid) in users"  :key="uid" :selected="user.selected">
          <mu-td>{{ uid }} </mu-td>
          <mu-td>
            {{user.email }}
          </mu-td>
          <mu-td>
            <mu-checkbox :label="user.isAdmin ? 'Ano' : 'Ne'" v-model="user.isAdmin"
            v-on:change="updateObject(uid, !user.isAdmin)"/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
      <mu-tfoot slot="footer">
        <mu-tr>
          <mu-td>ID</mu-td>
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

  export default {
    computed: {
      ...mapGetters(['usersArr', 'usersObj'])
    },
    methods: {
      updateObject (uid, isAdmin) {
        db.ref(`user/${uid}`).update({ isAdmin: isAdmin })
      }
    },
    created () {
      this.$store.dispatch('setUsersArrRef', db.ref(`usersArr`))
      this.$store.dispatch('setUsersObjRef', db.ref(`usersObj`))
      console.log(this.usersArr)
      console.log(this.usersObj)
    }
  }
</script>

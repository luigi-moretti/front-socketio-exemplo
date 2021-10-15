<template>
  <v-container>
    <v-row class="text-center">
      <v-list>
        <template v-for="mensagem in mensagens" >
          <v-list-item :key="mensagem">
            <v-card>
              <v-card-text>{{mensagem}}</v-card-text>
            </v-card>
          </v-list-item>
        </template>
      </v-list>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field v-model="entradaDados"></v-text-field>
          <v-btn type="submit" @click.prevent="enviar">Enviar</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item :key="notificacao.text" v-for="notificacao in notificacoes">
        <v-snackbar v-model="notificacao.exibe">
          {{notificacao.texto}}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="notificacao.exibe = false"
            >Fechar</v-btn>
          </template>
        </v-snackbar>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      mensagens: [],
      notificacoes: [],
      entradaDados: '',
    }),
    sockets:{
      connect: function () {
            console.log('socket connected')
      }
    },
    methods:{
      enviar(){
        this.emiteEventoSocket()
        this.entradaDados = ''
      },
      emiteEventoSocket(){
        this.$socket.emit("chat message", this.entradaDados)
      }
    },
    created(){
      this.$socket.on("chat message", (data) => {
        console.log(data)
      })
    },
    mounted(){
      console.log('fui montado')
      this.sockets.subscribe("chat message", (data) => {
        this.mensagens.push(data)
      })

      this.sockets.subscribe("notificacoes", (data) => {
        console.log(data)
        this.notificacoes.push(data)
      })
    }
  }
</script>

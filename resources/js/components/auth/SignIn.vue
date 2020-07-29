<template>
  <v-card max-width="300" class="mx-auto" outlined>
    <v-form>
      <v-container>
        <v-text-field
          outlined
          label="Login"
          v-model="form.email"
          :error-messages="emailErrors"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          type="Password"
          label="Password"
          outlined
          v-model="form.password"
          :error-messages="passwordErrors"
        ></v-text-field>
        <div class="text-center">
          <v-btn color="primary" @click="login()">
            <span v-if="!loading">Login</span
            ><v-progress-circular
              indeterminate
              color="white"
              :width="2"
              :size="20"
              v-else
            ></v-progress-circular
          ></v-btn>
        </div>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      userExist: true,
      loading: false
    };
  },
  methods: {
    // Login button click
    login() {
      // Remove user doesn't exist error
      this.userExist = true;

      // Validation check
      this.$v.$touch();

      if (this.$v.$anyError || this.loading) {
        return;
      }

      // Show loading spinner in button
      this.loading = true;

      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$v.$reset();
          this.userExist = false;
          this.$router.push("dashboard");
          this.loading = false;
        })
        .catch(() => {
          this.userExist = false;
          this.loading = false;
        });
    }
  },
  computed: {
    // Login validation
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Введен некорректный логин");
      !this.$v.form.email.required && errors.push("Необходимо ввести логин");
      !this.$v.form.email.userExist && errors.push("");
      return errors;
    },
    // Password validation
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required &&
        errors.push("Необходимо ввести пароль");
      !this.$v.form.password.userExist &&
        errors.push("Неправильный логин или пароль");
      return errors;
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
        userExist() {
          return this.userExist;
        }
      },
      password: {
        required,
        userExist() {
          return this.userExist;
        }
      }
    }
  }
};
</script>

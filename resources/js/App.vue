<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            app
            clipped
        >
            <v-list dense>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Главная</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/notes">
                    <v-list-item-action>
                        <v-icon>mdi-notebook-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Заметки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-currency-usd</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Финансы</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-clipboard-text-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Задачи</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-database</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Инвентаризация</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark clipped-left>
            <v-app-bar-nav-icon
                @click.stop="miniVariant = !miniVariant"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Everything</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        miniVariant: true
    })
};
</script>

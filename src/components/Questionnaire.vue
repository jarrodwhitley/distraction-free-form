<template>
    <div class="questionnaire overflow-hidden">
        <div class="questionnaire__header" :style="'background-color:' + data.primaryColor">
            <img class="questionnaire__header__logo h-full w-auto" :src="data.logo" alt="client logo"/>
        </div>
        <div class="questionnaire__intro h-screen w-auto flex flex-col justify-center items-center gap-10" v-show="!formBegin">
            <h1 class="questionnaire__intro__title text-6xl font-bold" v-text="data.intro.title"></h1>
            <p class="questionnaire__intro__text text-center" v-text="data.intro.text"></p>
            <button class="questionnaire__intro__cta bg-black text-white text-xl font-bold py-2 px-4 uppercase rounded"
                    :style="'background-color:' + data.secondaryColor"
                    v-text="data.intro.ctaText"
                    @click="launchForm"></button>
        </div>
        <form class="questionnaire__form grid grid-cols-1 grid-rows-1 items-center justify-center" v-show="formBegin">
            <div class="questionnaire__form__field h-screen w-screen row-start-1 col-start-1" :class="animationClass(index)" v-for="(field, index) in data.fields">
                <label class="flex flex-col text-3xl gap-5" :for="field.id">{{ field.label }}
                    <input v-if="field.type === 'text'" :type="field.type" :id="field.id" class="questionnaire__form__field--input bg-white border-b-2"/>
                    <select v-if="field.type === 'select'" :id="field.id" class="questionnaire__form__field--select">
                        <option v-for="option in field.options" :value="option.value" v-text="option.label"></option>
                    </select>
                </label>
            </div>
        </form>
        <div class="questionnaire__footer h-6 text-white text-sm flex items-center justify-end pr-2 bg-slate-800 fixed bottom-0 left-0 right-0">
            Donut Media 2024&copy;
        </div>
    </div>
</template>

<script>
export default {
    name: 'Questionnaire',
    props: {
        clientData: Array
    },
    mounted() {
        window.addEventListener('wheel', (e) => {
            if (this.scrollAnimationComplete && e.deltaY > 0) {
                this.nextField();
            } else {
                this.prevField();
            }
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.nextField();
            }
        });
    },
    data() {
        return {
            data: this.clientData,
            currentField: 0,
            formBegin: false,
            userInteraction: false,
            scrollDirection: '',
            formScrollInitiated: false,
            scrollAnimationComplete: true
        }
    },
    methods: {
        scrollAnimationHandler() {
            this.scrollAnimationComplete = false;
            setTimeout(() => {
                this.scrollAnimationComplete = true;
            }, 1000);
        },
        launchForm() {
            this.formBegin = true;
            this.focusCurrentField();
        },
        nextField() {
            if (!this.scrollAnimationComplete) return false;
            this.formScrollInitiated = true;
            this.scrollDirection = 'down';
            if (this.currentField !== this.data.fields.length - 1) {
                this.currentField++;
            }
            this.scrollAnimationHandler();
        },
        prevField() {
            if (!this.scrollAnimationComplete) return false;
            this.scrollDirection = 'up';
            if (this.currentField !== 0) {
                this.currentField--;
            }
            this.scrollAnimationHandler();
        },
        animationClass(index) {
            let classes = [];

            if (index < this.currentField) {
                classes.push('animate__fadeOutUp');
            } else if (index > this.currentField) {
                classes.push('animate__fadeOutDown');
            } else if (this.scrollDirection === 'down') {
                classes.push('animate__fadeInUp');
            } else if (this.scrollDirection === 'up') {
                classes.push('animate__fadeInDown');
            }

            if (!this.formScrollInitiated && index === 0) {
                classes.push('animate__animated animate__fadeInUp');
            } else if (!this.formScrollInitiated && index > 0) {
                classes.push('opacity-0 pointer-events-none');
            } else {
                classes.push('animate__animated');
            }

            return classes.join(' ');
        },
        focusCurrentField() {
            console.log('focusCurrentField');
            const currentField = this.$el.querySelector(`#${this.data.fields[this.currentField].id}`);
            currentField.focus();
        }
    },
    watch: {
        currentField(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.focusCurrentField();
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/questionnaire';
</style>

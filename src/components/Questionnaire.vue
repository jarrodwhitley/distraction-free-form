<template>
    <div class="questionnaire overflow-hidden relative">
        <div class="questionnaire__header flex flex-col" :style="'background-color:' + data.primaryColor">
            <img class="questionnaire__header__logo h-full w-auto" :src="data.logo" alt="client logo"/>
            <div class="questionnaire__progress w-screen bg-slate-100" :class="{ 'opacity-0' : !formBegin }">
                <div class="questionnaire__progress__bar h-1 bg-slate-800" :style="'width:' + ((currentField + 1) / data.fields.length) * 100 + '%'"></div>
            </div>
        </div>
        <Transition name="questionnaire__intro__transition" tag="div">
            <div class="questionnaire__intro h-screen w-auto flex flex-col md:grid grid-rows-2 md:grid-rows-1 grid-cols-2 justify-center items-center z-10 gap-5" v-show="!formBegin">
                <img class="questionnaire__intro__image z-0 object-cover pointer-events-none h-1/4 md:h-full row-start-1 col-span-full md:col-span-1 md:col-start-1" :src="data.background" alt="client background"/>
                <div class="flex flex-col w-full px-10 md:pl-10 md:pr-28 gap-10 row-start-2 md:row-start-1 col-span-full md:col-span-1 md:col-start-2">
                    <h1 class="questionnaire__intro__title text-5xl md:text-6xl font-bold" v-text="data.intro.title"></h1>
                    <p class="questionnaire__intro__text leading-7" v-text="data.intro.text"></p>
                    <div class="flex flex-row items-center gap-2">
                        <button class="questionnaire__intro__cta btn-primary" v-text="data.intro.ctaText" @click="launchForm"></button>
                        <div class="text-slate-800 text-xs">press <strong>Enter ↵</strong></div>
                    </div>
                </div>
            </div>
        </Transition>
        <form class="questionnaire__form grid grid-cols-1 grid-rows-1 items-center justify-items-center z-10" v-show="formBegin">
            <div class="questionnaire__form__field flex flex-col items-start caret-slate-800 justify-center h-screen px-10 w-full md:max-w-screen-md row-start-1 col-start-1 gap-5"
                 :class="animationClass(index)"
                 v-for="(field, index) in data.fields">
                <label class="flex flex-col text-2xl text-slate-800 gap-5" :for="field.id">{{ field.label }}
                    <input v-if="field.type === 'text'" :type="field.type" :id="field.id" placeholder="Type here..." class="questionnaire__form__field--input bg-white pb-2 border-b-2 capitalize"/>
                    <input v-if="field.type === 'email'" :type="field.type" :id="field.id" placeholder="Type here..." class="questionnaire__form__field--email bg-white pb-2 border-b-2"/>
                    <select v-if="field.type === 'select'" :id="field.id" class="questionnaire__form__field--select text-xl py-2 px-1 bg-slate-100 cursor-pointer">
                        <option selected disabled>Select an option</option>
                        <option class="text-base" v-for="option in field.options" :value="option.value" v-text="option.label"></option>
                    </select>
                    <span v-if="field.type === 'radio'" class="questionnaire__form__field--radio" v-for="option in field.options">
                        <label :for="field.id" class="text-base flex flex-row items-center justify-start gap-2">{{ option }}
                            <input class="opacity-0 pointer-events-none" :value="option" :name="field.id" :type="field.type" :id="field.id"/>
                            <span class="questionnaire__form__field--radio__checkmark rounded-full bg-slate-200 h-5 w-5"></span>
                        </label>
                    </span>
                    <input v-if="field.type === 'checkbox'" :type="field.type" :id="field.id" class="questionnaire__form__field--checkbox bg-white border-b-2"/>
                </label>
                <div class="flex flex-row items-center gap-2">
                    <div v-if="index !== data.fields.length - 1" class="questionnaire__form__field__next-btn btn-secondary" @click="nextField">Next</div>
                    <div v-else class="questionnaire__form__field__next-btn btn-secondary" @click="submit">Submit</div>
                    <div v-if="index !== data.fields.length - 1" class="text-slate-800 text-xs">press <strong>Enter ↵</strong></div>
                </div>
            </div>
        </form>
        <div class="questionnaire__nav-arrows fixed bottom-10 md:bottom-auto md:top-2/4 left-8 text-4xl" v-show="formBegin">
            <div class="questionnaire__nav-arrows__arrow cursor-pointer hover:bg-slate-200 px-1 rounded" @click="prevField">
                <i class="fas fa-chevron-up text-slate-800"></i>
            </div>
            <div class="questionnaire__nav-arrows__arrow cursor-pointer hover:bg-slate-200 px-1 rounded" @click="nextField">
                <i class="fas fa-chevron-down text-slate-800"></i>
            </div>
        </div>
        <div class="questionnaire__footer h-6 text-white text-sm flex items-center justify-end pr-2 bg-slate-800 fixed bottom-0 left-0 right-0">Donut Media &copy; 2024
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
            if (this.scrollAnimationComplete && this.formBegin && e.deltaY > 0) {
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
        // listen for the focus event and console.log the focused element
        window.addEventListener('focus', (event) => {
            console.log(event.target);
        }, true);
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
            this.scrollAnimationHandler();
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

            if (!this.formScrollInitiated && index === 0) {
                classes.push('animate__animated animate__fadeInUp');
            } else if (!this.formScrollInitiated && index > 0) {
                classes.push('opacity-0 pointer-events-none');
            } else {
                classes.push('animate__animated');
            }

            if (index < this.currentField) {
                classes.push('animate__fadeOutUp');
            } else if (index > this.currentField) {
                classes.push('animate__fadeOutDown');
            } else if (this.scrollDirection === 'down') {
                classes.push('animate__fadeInUp');
            } else if (this.scrollDirection === 'up') {
                classes.push('animate__fadeInDown');
            }

            return classes.join(' ');
        },
        focusCurrentField() {
            const currentField = this.$el.querySelector(`#${this.data.fields[this.currentField].id}`);
            setTimeout(() => {
                currentField.focus();
            }, 1000);
        },
        submit() {
            alert('Form submitted!');
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

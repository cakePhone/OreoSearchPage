app.component("settings", {
  props: {
    nickname: String,
    searchengine: {
      type: String,
      required: true
    },
    backgroundimage: {
      type: String,
      required: true
    }
  },

  template:
  /*html*/
  `
  <div id="settings-container">

    <i class="fa fa-cog icons" :class="{'rotated': settingsClosed}" @click="settingsClosed = !settingsClosed"></i>

    <div class="special-effects" :class="{'settings-closed': settingsClosed}" id="settings-menu">
        
      <h2 class="text" id="settings-title">Settings</h2>

      <!-- Nickname -->
      <section class="settings-items">

        <label for="nickname-input" class="text settings-items-text">Nickname</label>

        <input class="settings-input-text-option text special-effects" id="nickname-input" type="text" placeholder="Nickname" v-model="settingsNickname" @input="updateNickname">
          
      </section>

        <!-- Search Engine -->
      <section class="settings-items">

        <label for="search-engine-select" class="text settings-items-text">Search Engine</label>

        <select class="settings-select-option text special-effects" v-model="settingsSearchEngine" @change="updateSearchEngine" id="search-engine-select">

          <option value="0">Google</option>

          <option value="1">DuckDuckGo</option>

          <option value="2">Bing</option>

          <option value="3">Brave</option>

          <option value="4">Ecosia</option>

        </select>

      </section>

      <!-- Accent Color -->
      <section class="settings-items">

        <label for="accent-input" class="text settings-items-text">Accent color: {{ accentColor }}</label>

        <input class="settings-items-color-option text" id="accent-input" type="color" @change="updateAccentColor" v-model="accentColor">
          
      </section>

      <!-- Background Color-->
      <section class="settings-items">

        <label for="background-input" class="text settings-items-text">Background color: {{ backgroundColor }}</label>

        <input class="settings-items-color-option text" id="background-input" @change="updateBackgroundColor" v-model="backgroundColor" type="color">
          
      </section>

      <!-- Background Image -->
      <section class="settings-items">

        <label for="background-image-input" class="text settings-items-text">Background Image</label>

        <input class="settings-file-input" id="background-image-input" type="file" accept="image/*" @change="updateBackgroundImage">

        <label for="background-image-input" class="text special-effects" id="background-image-input-styled">Choose a File</label>

      </section>

      <button class="special-effects settinngs-items text" id="reset-to-defaults" @click="resetToDefaults">Reset to Defaults</button>

    </div>

  </div>
  `,

  data() {
    return {
      settingsClosed: true,

      settingsNickname: this.nickname,
      settingsSearchEngine: this.searchengine,
      settingsBackgroundImage: this.backgroundimage,
      accentColor: (localStorage.getItem("accentColor")) ? localStorage.getItem("accentColor") : "#ffffff",
      backgroundColor: (localStorage.getItem("backgroundColor")) ? localStorage.getItem("backgroundColor") : "#000000",
    }
  },

  mounted() {
    //* Take care of settings at start
    this.updateAccentColor()
    this.updateBackgroundColor()
    this.updateSearchEngine()
  },

  methods: {
    //! Helper Methods
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    },

    rgbToHex(r, g, b) {
      return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
    },
    
    //! Settings
    updateNickname() {
      localStorage.setItem("username", this.settingsNickname)
      this.$emit("changed-nickname", this.settingsNickname)
    },

    updateSearchEngine() {
      if(!localStorage.getItem("searchEngine")) { localStorage.setItem("searchEngine", "0") }
      localStorage.setItem("searchEngine", this.settingsSearchEngine)
      this.$emit("changed-search-engine", this.settingsSearchEngine)
    },
    
    updateAccentColor() {
      if(!localStorage.getItem("accentColor")) { localStorage.setItem("accentColor", "#ffffff") }
      localStorage.setItem("accentColor", this.accentColor)

      let rgbAccentColor = `${this.hexToRgb(this.accentColor).r},${this.hexToRgb(this.accentColor).g},${this.hexToRgb(this.accentColor).b}`
      let rgbTextColor = `${(this.hexToRgb(this.accentColor).r + 20 > 255) ? 255 : this.hexToRgb(this.accentColor).r + 20},
                          ${(this.hexToRgb(this.accentColor).g + 20 > 255) ? 255 : this.hexToRgb(this.accentColor).g + 20},
                          ${(this.hexToRgb(this.accentColor).b + 20 > 255) ? 255 : this.hexToRgb(this.accentColor).b + 20}`

      document.documentElement.style.setProperty("--accent-color", rgbAccentColor)
      document.documentElement.style.setProperty("--text-color", rgbTextColor)
    },

    updateBackgroundColor() {
      if(!localStorage.getItem("backgroundColor")) { localStorage.setItem("backgroundColor", "#000000") }
      localStorage.setItem("backgroundColor", this.backgroundColor)

      document.documentElement.style.setProperty("--background-color", `${this.hexToRgb(this.backgroundColor).r},${this.hexToRgb(this.backgroundColor).g},${this.hexToRgb(this.backgroundColor).b}`)
    },

    updateBackgroundImage(event) {
      if(!localStorage.getItem("backgroundImage")) { localStorage.setItem("backgroundImage", `data:image/png;base64,${localStorage.getItem("backgroungImage")}`) }
      if(!event.target.files[0]) return

      const reader = new FileReader()

      reader.onload = () => {
        if(event.target.files[0].size > 4.5 * 1000000) { alert("File is too big"); return }
        this.settingsBackgroundImage = reader.result
        const base64 = this.settingsBackgroundImage.split(",")[1]
        localStorage.setItem("backgroundImage", base64)
        this.$emit("changed-bg-image", this.settingsBackgroundImage)
      }

      reader.readAsDataURL(event.target.files[0])
    },

    resetToDefaults() {
      if(!confirm("Are you sure you want to reset ALL your settings?")) return
      localStorage.clear()
      location.reload()
    }
  }
})
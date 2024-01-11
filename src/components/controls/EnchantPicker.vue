<template>
  <div class="row">
    <div class="col-6">
      <select
        :value="value.split(':')[0]"
        class="form-control"
        @input="concatAndUpdate($event.target.value, null)"
      >
        <option value="minecraft">Minecraft</option>
        <option value="mna">Mana and Artifice</option>
        <option value>Other</option>
      </select>
    </div>
    <div class="col-6">
      <select
        v-if="value.split(':')[0] === 'minecraft'"
        class="form-control"
        :value="value.split(':')[1]"
        @input="concatAndUpdate(null, $event.target.value)"
      >
        <option value="aqua_affinity">Aqua Affinity</option>
        <option value="bane_of_arthropods">Bane of Arthropods</option>
        <option value="binding_curse">Binding Curse</option>
        <option value="blast_protection">Blast Protection</option>
        <option value="channeling">Channeling</option>
        <option value="depth_strider">Depth Strider</option>
        <option value="efficiency">Efficiency</option>
        <option value="feather_falling">Feather Falling</option>
        <option value="fire_aspect">Fire Aspect</option>
        <option value="fire_protection">Fire Protection</option>
        <option value="flame">Flame</option>
        <option value="fortune">Fortune</option>
        <option value="frost_walker">Frost Walker</option>
        <option value="impaling">Impaling</option>
        <option value="infinity">Infinity</option>
        <option value="knockback">Knockback</option>
        <option value="looting">Looting</option>
        <option value="loyalty">Loyalty</option>

        <option value="luck_of_the_sea">Luck of the Sea</option>
        <option value="lure">Lure</option>
        <option value="mending">Mending</option>
        <option value="multishot">Multishot</option>
        <option value="piercing">Piercing</option>
        <option value="power">Power</option>
        <option value="projectile_protection">Projectile Protection</option>
        <option value="protection">Protection</option>
        <option value="punch">Punch</option>
        <option value="quick_charge">Quick Charge</option>
        <option value="respiration">Respiration</option>
        <option value="riptide">Riptide</option>
        <option value="sharpness">Sharpness</option>
        <option value="silk_touch">Silk Touch</option>        
        <option value="smite">Smite</option>
        <option value="soul_speed">Soul Speed</option>
        <option value="sweeping">Sweeping</option>
        <option value="thorns">Thorns</option>
        <option value="unbreaking">Unbreaking</option>
        <option value="vanishing_curse">Vanishing Curse</option>
      </select>

       <select
        v-else-if="value.split(':')[0] === 'mna'"
        class="form-control"
        :value="value.split(':')[1]"
        @input="concatAndUpdate(null, $event.target.value)"
      >
        <option value="aura-healing">Aura of Healing</option>
        <option value="aura-running">Aura of Running</option>
        <option value="aura-pilgrim">Aura of the Pilgrim</option>
        <option value="aura-jumping">Aura of Jumping</option>
        <option value="aura-depths">Aura of the Depths</option>
        <option value="aura-mining">Aura of Mining</option>
        <option value="aura-repair">Aura of Repair</option>
        <option value="bouncing">Bouncy</option>
        <option value="cloudstep">Cloudstep</option>
        <option value="beheading">Beheading</option>
        <option value="transitorystep">Transitory Step</option>
        <option value="gilded">Gilded</option>
        <option value="fireproof">Fireproof</option>
      </select>

      <input v-else type="text" :value="value.split(':')[1]" @input="concatAndUpdate(null, $event.target.value)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    concatAndUpdate(namespace, location) {
      var curSplit = this.value.split(":");
      if (namespace != null) curSplit[0] = namespace;
      if (location != null) curSplit[1] = location;

      //simulate the input event's structure so that it's consistent with other similar calls
      //this allows for $event.target.value retrieval of the changed value
      this.$emit("input", {
        target: {
          value: curSplit.join(":")
        }
      });
    }
  }
};
</script>
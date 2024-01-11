class ColorMap {
    constructor() {
        this.map=[];
        this.map.push({ name: "black", style: "color: rgb(0, 0, 0);", hex: "#000000" });
        this.map.push({ name: "dark_blue", style: "color: rgb(0, 0, 170);", hex: "#0000aa" });
        this.map.push({ name: "dark_green", style: "color: rgb(0, 170, 0);", hex: "#00aa00" });
        this.map.push({ name: "dark_aqua", style: "color: rgb(0, 170, 170);", hex: "#00aaaa" });
        this.map.push({ name: "dark_red", style: "color: rgb(170, 0, 0);", hex: "#aa0000" });
        this.map.push({ name: "dark_purple", style: "color: rgb(170, 0, 170);", hex: "#aa00aa" });
        this.map.push({ name: "gold", style: "color: rgb(255, 170, 0);", hex: "#ffaa00" });
        this.map.push({ name: "gray", style: "color: rgb(170, 170, 170);", hex: "#aaaaaa" });
        this.map.push({ name: "dark_gray", style: "color: rgb(85, 85, 85);", hex: "#555555" });
        this.map.push({ name: "blue", style: "color: rgb(85, 85, 255);", hex: "#5555ff" });
        this.map.push({ name: "green", style: "color: rgb(85, 255, 85);", hex: "#55ff55" });
        this.map.push({ name: "aqua", style: "color: rgb(85, 255, 255);", hex: "#55ffff" });
        this.map.push({ name: "red", style: "color: rgb(255, 85, 85);", hex: "#ff5555" });
        this.map.push({ name: "light_purple", style: "color: rgb(255, 85, 255);", hex: "#ff55ff" });
        this.map.push({ name: "yellow", style: "color: rgb(255, 255, 85);", hex: "#ffff55" });
        this.map.push({ name: "white", style: "color: rgb(255, 255, 255);", hex: "#ffffff" });
    }

    lookupByName(name){
        if (!name)
            return "";
        let mapped = this.map.find(e => e.name === name.trim());
        if (mapped)
            return mapped.style;
        return "";
    }

    lookupByStyle(style){
        if (!style)
            return "";
        const match_style = style.trim();
        let mapped = this.map.find(e => e.style === 'color: ' + match_style + ";" || e.hex === match_style);
        if (mapped)
            return mapped.name;

        console.log("Unable to find style mapping for: ");
        console.log(style);
        return "";
    }

    allColors(){
        return this.map.map(e => e.hex);
    }
}
export default ColorMap; 
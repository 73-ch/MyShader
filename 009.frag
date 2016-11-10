#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void circle(in vec2 st,in vec2 pos, in float rad, in vec3 col, out vec3 res){
    vec2 dist = st-vec2(pos);
    float pct = 1. - step(rad, dot(dist,dist) * 5.);
    res = vec3(col * pct);
}

float rnd(vec2 n){
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color;
	for(float i = 0.; i < 20.; i++){
        vec3 obj;
        float rnd_x = rnd(vec2(u_mouse.x/ u_resolution.x, i));
        float rnd_y = rnd(vec2(u_mouse.y/ u_resolution.y, i));
        circle(st, vec2(rnd_x, rnd_y), sin(i) / 5.,	vec3(rnd_x, rnd_y,0.565), obj);
        color = color + obj;
    }
	gl_FragColor = vec4( color, 1.0);
}
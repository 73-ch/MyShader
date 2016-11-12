// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rnd(vec2 n){
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void square(in vec2 st,in vec2 pos, in vec2 siz, in vec4 col, out vec4 res){
    vec2 bl = step(pos, st);
    vec2 tr = step(1. - pos - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y;
    res = vec4(col.rgb * pct, res);
}

void borderSquare(in vec2 st,in vec2 pos, in vec2 siz, in float wid, in vec4 col, out vec4 res){
    vec2 bl = step(pos, st);
    vec2 tr = step(1. - pos - siz, 1. - st);

    vec2 ibl = step(pos + wid, st);
    vec2 itr = step(1. - pos + wid - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y * sign(abs(ibl.x + ibl.y - 2.) + abs(itr.x + itr.y - 2.));

    res = vec4(col.rgb * pct, res);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(.0);
        vec2 pos = vec2(.03,.77);
        vec2 siz = vec2(.15 , .2);
        vec4 b_col = vec4(vec3(.845,.220,.243), .856);
        vec4 box;
        square(st, pos, siz, b_col, box);
        color += box;
    	pos = vec2(.21, .77);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.03, .54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.21, .54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.39, .77);
    	siz = vec2(.45 , .2);
    	b_col = vec4(vec3(.99,.929,.92), .8);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.39, .54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.39,.11);
    	siz = vec2(.45 , .4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.03, .11);
    	siz = vec2(.15 , .4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.39, -.32);
    	siz = vec2(.62, .39);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	b_col = vec4(vec3(.38, .361, .99), .8);
    	pos = vec2(.21, .11);
    	siz = vec2(.15 , .4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(.87, .11);
    	siz = vec2(.17, .86);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	b_col = vec4(vec3(.835, .782, .442), .8);
    	pos = vec2(.03, -.32);
    	siz = vec2(.33, .39);
    	square(st, pos, siz, b_col, box);
    	color += box;
    gl_FragColor = vec4(color);
}
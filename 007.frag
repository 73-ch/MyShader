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

    float pct = bl.x * bl.y * tr.x * tr.y * sign(abs(ibl.x + ibl.y - 2.0) + abs(itr.x + itr.y - 2.));

    res = vec4(col.rgb * pct, res);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);
        vec2 pos = vec2(0.030,0.770);
        vec2 siz = vec2(0.15 , 0.2);
        vec4 b_col = vec4(vec3(0.845,0.220,0.243), 0.856);
        vec4 box;
        square(st, pos, siz, b_col, box);
        color += box;
    	pos = vec2(0.21, 0.77);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.03, 0.54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.21, 0.54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.39, 0.77);
    	siz = vec2(0.45 , 0.2);
    	b_col = vec4(vec3(0.990,0.929,0.920), 0.8);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.39, 0.54);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.390,0.110);
    	siz = vec2(0.45 , 0.4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.03, 0.11);
    	siz = vec2(0.15 , 0.4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.390,-0.320);
    	siz = vec2(0.620,0.390);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	b_col = vec4(vec3(0.380,0.361,0.990), 0.8);
    	pos = vec2(0.21, 0.11);
    	siz = vec2(0.15 , 0.4);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	pos = vec2(0.870,0.110);
    	siz = vec2(0.170,0.860);
    	square(st, pos, siz, b_col, box);
    	color += box;
    	b_col = vec4(vec3(0.835,0.782,0.442), 0.8);
    	pos = vec2(0.030,-0.320);
    	siz = vec2(0.330,0.390);
    	square(st, pos, siz, b_col, box);
    	color += box;
    gl_FragColor = vec4(color);
}
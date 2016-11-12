// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void circle(in vec2 st,in vec2 pos, in float rad, in vec3 col, out vec3 res){
    vec2 dist = st - vec2(pos);
    float pct = 1. - step(rad, dot(dist, dist) * 5.);
    res = vec3(col * pct);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    // normal
    pct = distance(st, vec2(.5)) * 1.4;

    // animation
    // pct = distance(st, vec2(.5)) * (sin(u_time) + 2.);

    // smoothstep まる角
    // pct = distance(smoothstep(0., 1., st), vec2(.5)) * 1.196;

    // vec2 toCenter = vec2(.5)-st;
    // pct = length(toCenter);

    // vec2 tC = vec2(.5) - st;
    // pct = sqrt(tC.x * tC.x + tC.y * tC.y);
    vec3 color;
    // グラデーション (デフォルト)
    // color = vec3(pct);
    // 黒い円
    // color = vec3(step(.5, pct));
    // 白い円
    // color = vec3(1. - step(.5, pct));
    // グララデーション　smoothstep
    // color = vec3(smoothstep(.368 , .608, pct));

    vec3 obj;
    circle(st, u_mouse / u_resolution, 0.370, vec3(.529,.284,.565), obj);
    gl_FragColor = vec4(obj, 1.);
}
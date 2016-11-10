// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st = mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 scale(vec2 _st, vec2 _scale){
    _st -= 0.5;
    _st = mat2(_scale.x, 0.0,0.0, _scale.y) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom, out vec2 pos){
    _st *= _zoom;
    pos = ceil(_st);
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    vec2 pos;
    vec2 bst;
    st = tile(st,6., pos);
    bst = st;
    // st = scale(st, vec2(1. - abs));


    // Draw a square
    float time = mod(u_time * 2., 2.);
    float inter = mod(u_time, 6.);
    float a = (step(inter + 2./3., pos.x) - step(inter + 1., pos.x)) * (step(inter, pos.y) - step(inter + 1., pos.y));
    float b = (step(inter + 1./3., pos.x) - step(inter + 1., pos.x)) * (step(inter + 1., pos.y) - step(inter + 2., pos.y));
    float c = (step(inter + 2., pos.x) - step(inter + 2., pos.x)) * (step(inter + 1., pos.y) - step(inter + 2., pos.y));
    float p = sign(a + b + c);
    float speed = 2.;
    vec2 inv = vec2(sign(mod(pos.x, 2.) - .5), 1.) * vec2(sign(mod(pos.y, 2.) - .5), 1.);
    st += vec2(0.45 * time - 0.45, 0.45) * inv;
    color += vec3(box(st,vec2(0.1),0.01)) * p;
    st = bst + vec2(-0.45, 0.45 * time - 0.45) * inv;
    color += vec3(box(st,vec2(0.1),0.01)) * p;
    st = bst + vec2(-0.45 * time + 0.45, -0.45) * inv;
    color += vec3(box(st,vec2(0.1),0.01)) * p;
    st = bst + vec2(0.45, -0.45 * time + 0.45) * inv;
    color += vec3(box(st,vec2(0.1),0.01)) * p;


    // color += vec3(box(st,vec2(0.1),0.01)) * (step(inter, pos.x) - step(inter + 1., pos.x)) * (step(inter, pos.y) - step(inter + 2., pos.y));
    // st = bst + vec2(-0.45, 0.45 * mod(u_time * 2., 2.) - 0.45);
    // color += vec3(box(st,vec2(0.1),0.01)) * (step(inter, pos.x) - step(inter + 1., pos.x)) * (step(inter, pos.y) - step(inter + 2., pos.y));
    // st = bst + vec2(-0.45 * mod(u_time * 2., 2.) + 0.45, -0.45);
    // color += vec3(box(st,vec2(0.1),0.01)) * (step(inter, pos.x) - step(inter + 1., pos.x)) * (step(inter, pos.y) - step(inter + 2., pos.y));
    // st = bst + vec2(0.45, -0.45 * mod(u_time * 2., 2.) + 0.45);
    // color += vec3(box(st,vec2(0.1),0.01)) * (step(inter, pos.x) - step(inter + 1., pos.x)) * (step(inter, pos.y) - step(inter + 2., pos.y));

    gl_FragColor = vec4(color,1.0);
}
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 scale(vec2 _st, vec2 _scale){
    _st -= 0.5;
    _st =  mat2(_scale.x,0.0,
                0.0,_scale.y) * _st;
    _st += 0.5;
    return _st;
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

float circle(vec2 _st, float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main(void){
    vec2 bst = gl_FragCoord.xy/u_resolution.xy;
    // vec2 zoom = vec2(4.);
    vec2 zoom = vec2(8., 5.); //openframeworks full
    vec2 zst = bst * zoom;
    vec2 pos = ceil(zst);
    float speed = 2.;
    float inter = mod(u_time,6.);
    bst.x += smoothstep(0., .5, inter) * mod(pos.y, 2.) * speed;
    bst.x += smoothstep(.5, 1., inter) * sign(mod(pos.y, 2.) - 0.9) * speed;
    bst.y += smoothstep(1., 1.5, inter) * mod(pos.x, 2.) * speed;
    // bst.y += smoothstep(2., 3., inter) * sign(pos.x - 2.1) * speed * 2.;
    bst.y += smoothstep(2., 3., inter) * sign(pos.x - 4.1) * speed * 2.;// openframworks full
    bst.x -= smoothstep(3.5, 4., inter)* speed;
    bst.x += step(4., inter) * mix(4., 6., inter) * mod(floor((inter - 4.)* 8.), 2.) * sign(mod(pos.y, 2.) - 0.9) /2.;
    bst.y += step(4., inter) * mix(4., 6., inter) * (1. - mod(floor((inter - 4.) * 8.), 2.)) * sign(mod(pos.x, 2.) - 0.9) /2.;
    vec2 st = fract(bst * zoom);
    vec3 color = vec3(0.0);

    st = rotate2D(st,PI* 4. * (inter - 2.) * (step(1.5, inter) - step(2., inter)));
    st = scale(st, vec2(1. + abs(sin((inter- 2.5) *6.)) * (step(3., inter) - step(3.5, inter))));

    color =  vec3(box(st,vec2(0.7),0.01));

    gl_FragColor = vec4(color,0.9);
}
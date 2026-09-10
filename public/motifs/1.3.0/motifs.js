//#region src/data/selection.ts
var e = 10.3, t = .96, n = {
	imperfection: .58,
	paletteDelay: 2,
	redAdvance: .5,
	colourContrast: !0,
	redRestraint: 0,
	colourWaves: !0,
	microJitter: .08,
	softRed: !0,
	grid: 128,
	size: 64 / 104
}, r = [
	"turing",
	"backprop",
	"bayes",
	"shannon",
	"alphago",
	"rosenblatt",
	"alexnet",
	"transformer",
	"lovelace"
];
r.map((e) => e === "rosenblatt" ? "deep-blue" : e);
//#endregion
//#region src/lib/hero/deepblue.ts
var i = [
	3,
	5,
	6,
	9,
	1,
	2,
	7,
	8
];
function a(e = i) {
	if (e.length !== 8 || e.some((e) => !Number.isFinite(e))) throw Error("The search study requires eight finite leaf scores.");
	let t = [], n = /* @__PURE__ */ new Map(), r = s(0, !0, -Infinity, Infinity), a = [0];
	for (; n.has(a.at(-1));) a.push(n.get(a.at(-1)));
	return {
		value: r,
		path: a,
		events: t
	};
	function s(r, i, a, c) {
		if (r >= 7) {
			let n = e[r - 7];
			return t.push({
				kind: "evaluate",
				node: r,
				score: n
			}), n;
		}
		let l = i ? -Infinity : Infinity, u = [r * 2 + 1, r * 2 + 2];
		for (let [e, d] of u.entries()) {
			let f = s(d, !i, a, c);
			if ((i ? f > l : f < l) && (l = f, n.set(r, d)), i ? a = Math.max(a, l) : c = Math.min(c, l), a >= c && e === 0) {
				t.push({
					kind: "cutoff",
					node: r,
					skipped: o(u[1]),
					alpha: a,
					beta: c
				});
				break;
			}
		}
		return l;
	}
}
function o(e) {
	return e >= 7 ? [e] : [
		e,
		...o(e * 2 + 1),
		...o(e * 2 + 2)
	];
}
//#endregion
//#region src/lib/hero/alphago.ts
var s = [
	[3, 3],
	[15, 3],
	[16, 10],
	[14, 13],
	[16, 13],
	[10, 14],
	[4, 15],
	[6, 15],
	[5, 16],
	[9, 16],
	[10, 16],
	[14, 16],
	[9, 17],
	[11, 17],
	[12, 17]
], c = [
	[9, 2],
	[2, 13],
	[12, 14],
	[2, 15],
	[9, 15],
	[10, 15],
	[15, 15],
	[16, 15],
	[3, 16],
	[4, 16],
	[11, 16],
	[12, 16],
	[13, 16],
	[10, 17],
	[13, 17]
], l = [14, 15], u = [14, 14], d = [{
	point: [8, 15],
	frequency: 20
}, {
	point: l,
	frequency: 79
}], f = 268 / 30, p = f / 20, m = [
	4.1,
	4.4,
	3.1,
	2.3,
	3.3,
	4.4,
	4.1,
	3.1,
	4.4
].map((e) => (e - .38) * p), ee = .9 * p, h = .18 * p, g = [
	1.65,
	1.9,
	1.32,
	.95,
	1.27,
	1.95,
	1.7,
	1.38,
	1.87
], _ = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), v = (e, t, n) => e + (t - e) * n, y = (e, t, n) => _((e - t) / (n - t)), b = (e) => {
	let t = _(e);
	return t * t * (3 - 2 * t);
}, x = (e) => (e % 20 + 20) % 20, S = (e) => x(e) * p;
function C(e, t) {
	let n = S(e);
	return n < 8.3 ? 8.3 * y(n, g[t], 8.3) : n;
}
function w(e, t) {
	let n = (S(e) - [
		.05,
		.15,
		-.24,
		-.16
	][t] + f) % f;
	return b(y(n, 0, .28)) * (1 - b(y(n, .755, 2.085))) - b(y(n, 5.6, 6.55)) * (1 - b(y(n, 7.25, 8.3)));
}
function T(e, t = 17) {
	let n = Math.imul(e + t, 73244475);
	return n = Math.imul(n ^ n >>> 16, 73244475), ((n ^ n >>> 16) >>> 0) / 4294967296;
}
function E(e) {
	return e <= 0 || e >= 1 ? 0 : -e * Math.log2(e) - (1 - e) * Math.log2(1 - e);
}
var D = [
	0,
	null,
	1,
	1,
	0,
	null,
	1,
	null
];
function O(e) {
	let t = Math.max(0, Math.floor(e)), n = [];
	for (let e = 0; e < t; e++) n.push(D[e % D.length]);
	return {
		tape: n,
		head: t,
		state: t % D.length
	};
}
function k(e) {
	if (e.length !== 6) throw Error("The mirror detector has six inputs.");
	let t = (e) => 1 / (1 + Math.exp(-e)), n = [[
		14.2,
		-3.6,
		7.2,
		-7.2,
		3.6,
		-14.2
	], [
		-14.2,
		3.6,
		-7.1,
		7.1,
		-3.6,
		14.2
	]].map((n) => t(n.reduce((t, n, r) => t + n * e[r], -1.1)));
	return {
		hidden: n,
		output: t(6.4 - 8.8 * (n[0] + n[1]))
	};
}
var A = "10110110110110101110";
function j(e) {
	let t = [...e].filter((e) => e === "1").length, n = t + 1, r = e.length - t + 1;
	return [M(.025, n, r), M(.975, n, r)];
}
function M(e, t, n) {
	let r = 0, i = 1;
	for (let a = 0; a < 48; a++) {
		let a = (r + i) / 2;
		N(a, t, n) < e ? r = a : i = a;
	}
	return (r + i) / 2;
}
function N(e, t, n) {
	let r = t + n - 1, i = 1, a = 0;
	for (let n = 0; n <= r; n++) n >= t && (a += i * e ** n * (1 - e) ** (r - n)), i *= (r - n) / (n + 1);
	return a;
}
var P = "rgb(255,45,45)";
function F(e, t = r) {
	let n = document.createElement("canvas");
	n.width = n.height = 960;
	let i = n.getContext("2d"), o = pe(e), s, c = {
		bayes: L,
		lovelace: B,
		turing: V,
		shannon: te,
		rosenblatt: ne,
		backprop: ae,
		alexnet: (e, t) => se(e, t, o),
		alphago: ce,
		transformer: de,
		"deep-blue": (e, t) => re(e, t, s ??= a())
	};
	return {
		canvas: n,
		draw(e) {
			i.fillStyle = "black", i.fillRect(0, 0, n.width, n.height), t.forEach((t, n) => {
				i.save(), i.translate(n % 3 * 320, Math.floor(n / 3) * 320), i.scale(320, 320), Z(i, .005, .005, .99, .99, .045), i.clip(), c[t](i, C(e, n)), i.restore();
			});
		}
	};
}
var I = Array.from({ length: 21 }, (e, t) => j(A.slice(0, t)));
function L(e, t) {
	e.fillStyle = K(e, 235, 195), Z(e, .025, .03, .95, .77, .035), e.fill();
	let n = .6425;
	e.fillStyle = G(5), e.fillRect(.6255, .03, .034, .77), Y(e, n, .13, .055, G(5)), Y(e, n, .13, .033, P);
	let r = 0, i = 0;
	for (let n = 0; n < 20; n++) {
		let a = .5 + n * .35;
		if (t < a) continue;
		let o = y(t, a, a + .65), s = A[n] === "1", c = s ? v(.09, .5774999999999999, T(n, 91)) : v(.7075, .92, T(n, 91)), l = v(.24, .72, T(n, 412)), u = (1 - b(o)) * .29;
		Y(e, c, l - u, .042, G(5)), s || Y(e, c, l - u, .026, G(250)), o === 1 && (r++, i = a + .65);
	}
	let a = I[Math.max(0, r - 1)], o = I[r], s = b(y(t, i, i + .22)), c = v(a[0], o[0], s), l = v(a[1], o[1], s);
	e.fillStyle = G(90), e.fillRect(.025, .868, .95, .047), e.fillStyle = G(245), e.fillRect(.025 + c * .95, .847, (l - c) * .95, .09), e.fillStyle = P, e.fillRect(.6305, .831, .024, .123);
}
var R = [
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	24
], z = [
	7,
	11,
	12,
	13,
	10,
	6,
	7,
	8,
	11,
	6,
	7,
	9,
	11,
	12,
	13,
	10,
	24
];
function B(e, t) {
	let n = t >= 4.35 && t < 5.15, r = (t < 4.35 ? v(8, 23, y(t, .65, 4.35)) : t < 5.15 ? v(23, 13, b(y(t, 4.35, 5.15))) : v(13, 24, y(t, 5.15, 7.8))) - 8, i = .125, a = _(r - 3.3, 0, 9.8) * i;
	e.fillStyle = K(e, 245, 200), e.fillRect(0, 0, 1, 1), e.save(), e.translate(0, -a);
	let o = [
		.072,
		.06,
		.06,
		.06,
		.065,
		.1,
		.1,
		.1,
		.105
	], s = .16;
	if (o.forEach((t, n) => {
		e.fillStyle = G(5), e.fillRect(s, 0, .016, 2.2);
		for (let r = 0; r < 17; r++) z[r] === R[n] && e.fillRect(s + .022, .075 + r * i, t - .027, .072);
		s += t;
	}), e.fillStyle = G(5), [
		.04,
		.665,
		2.165
	].forEach((t) => e.fillRect(.15, t, .83, .025)), !n) {
		let t = .15 + r * i;
		e.fillStyle = P, e.fillRect(.155, t, .8, .045), e.fillStyle = q(e, .165, t + .01, .78, .025), e.fillRect(.165, t + .01, .78, .025);
	}
	if (e.restore(), e.beginPath(), e.moveTo(.13, .16), e.bezierCurveTo(.065, .16, .12, .44, .035, .5), e.bezierCurveTo(.12, .56, .065, .84, .13, .84), e.lineWidth = .033, e.strokeStyle = G(5), e.stroke(), n && Y(e, .085, v(.84, .16, y(t, 4.35, 5.15)), .042, P), t >= 7.8) {
		let t = 2.075 - a;
		e.fillStyle = P, e.fillRect(.799, t, .078, .072), e.fillStyle = q(e, .809, t + .01, .058, .052), e.fillRect(.809, t + .01, .058, .052);
	}
}
function V(e, t) {
	let n = D.length, r = y(t, .6, 8.3) * n, i = Math.min(n, Math.floor(r)), a = i === n ? 0 : r - i, o = O(i + +(a > .22)), s = i + b((a - .25) / .75);
	e.save(), e.translate(.5, .5), e.rotate(-.16), e.translate(-.5, -.5), e.fillStyle = K(e, 245, 190), e.fillRect(-.3, .39, 1.6, .5);
	let c = .245;
	for (let t = -3; t <= 13; t++) {
		let n = .64 + (t - s) * c;
		e.fillStyle = G(5), e.fillRect(n - c / 2, .39, .024, .5);
		let r = o.tape[t];
		r === 0 ? (Z(e, n - .063, .49, .126, .29, .05), e.lineWidth = .032, e.strokeStyle = G(5), e.stroke()) : r === 1 && X(e, [
			[n - .05, .54],
			[n + .008, .49],
			[n + .008, .78]
		], .043, G(5));
	}
	let l = i < n && D[i] !== null ? Math.sin(Math.PI * y(a, 0, .3)) * .042 : 0;
	e.fillStyle = G(220), Z(e, .465, .055 + l, .35, .26, .035), e.fill(), e.fillStyle = G(5), e.fillRect(.515, .09 + l, .25, .12), e.fillStyle = P, e.fillRect(.615, .26 + l, .05, .135), e.restore();
}
var H = Array.from({ length: 161 }, (e, t) => [.045 + t / 160 * .91, .91 - E(t / 160) * .76]);
function te(e, t) {
	let n = v(.025, .975, y(t, .65, 8.3)), r = .045 + n * .91, i = .91 - E(n) * .76;
	e.beginPath(), e.moveTo(.045, .91);
	for (let [t, n] of H) e.lineTo(t, n);
	e.closePath(), e.fillStyle = K(e, 245, 180), e.fill(), X(e, [
		[.025, .08],
		[.025, .935],
		[.98, .935]
	], .022, G(180)), e.fillStyle = G(5), e.fillRect(r - .021, i, .042, .91 - i), J(e, r, i, .058);
}
function ne(e, t) {
	let n = v(-.1, .61, y(t, .65, 8.3));
	for (let t = 0; t < 10; t++) for (let r = 0; r < 8; r++) {
		let i = .02 + r * .066, a = .06 + t * .086;
		e.fillStyle = G(v(235, 5, 1 - b((Math.abs(i + .024 - (n + (a - .5) * .48)) - .055) / .035))), e.fillRect(i, a, .048, .065);
	}
	let r = (e) => {
		let t = n + (e - .5) * .48;
		return b((t + .1) / .16) * (1 - b((t - .44) / .16));
	};
	for (let n = 0; n < 4; n++) {
		let i = .17 + n * .215, a = [
			0,
			2,
			0,
			1
		][n];
		X(e, [[.54, i], [.65, i]], .032, G(175)), X(e, [[.69, i], [.81, .26 + a * .24]], .027, G(175)), Y(e, .66, i, .047, G(80 + r(i) * 165));
		let o = (Math.max(0, t - .7) / 2.4 + n * .14) % 1;
		t > .7 && Y(e, o < .42 ? v(.54, .66, o / .42) : v(.66, .83, (o - .42) / .58), o < .42 ? i : v(i, .26 + a * .24, (o - .42) / .58), .023, P);
	}
	for (let t = 0; t < 3; t++) {
		let n = .26 + t * .24;
		X(e, [[.85, n], [.955, .5]], .03, G(190)), Y(e, .83, n, .059, G(95 + r(n) * 150));
	}
	Y(e, .96, .5, .065, G(235)), Y(e, .96, .5, .035 * r(.5), G(5));
}
var U = Array.from({ length: 15 }, (e, t) => {
	let n = Math.floor(Math.log2(t + 1)), r = t - (2 ** n - 1);
	return [.83 - n * .26, .02 + (r + .5) / 2 ** n * .96];
});
function re(e, t, n) {
	let r = .65, i = 7.45, a = 6.8 / n.events.length, o = b(y(t, n.events.at(-1)?.kind === "cutoff" ? i - a : i, 8)), s = n.events.flatMap((e, n) => e.kind === "cutoff" ? [{
		...e,
		remaining: 1 - b(y(t, r + n * a, r + (n + 1) * a))
	}] : []), c = U.slice(1).map((e, t) => {
		let r = t + 1, i = U[Math.floor((r - 1) / 2)], a = (i[0] + e[0]) / 2, c = [
			i,
			[a, i[1]],
			[a, e[1]],
			e
		], l = [
			0,
			.15,
			.105,
			.08
		][Math.floor(Math.log2(r + 1))];
		n.path.includes(r) && (l += o * .032);
		let u = s.find((e) => e.skipped.includes(r));
		if (u) {
			let e = U[u.node];
			c = c.map(([t, n]) => [v(e[0], t, u.remaining), v(e[1], n, u.remaining)]), l *= u.remaining;
		}
		return {
			path: c,
			width: l
		};
	});
	c.forEach(({ path: t, width: n }) => {
		n > 0 && X(e, t.map(([e, t]) => [e + .014, t + .021]), n + .012, G(5));
	}), c.forEach(({ path: t, width: n }) => {
		n <= 0 || (X(e, t, n, G(115)), X(e, t.map(([e, t]) => [e, t - n * .1]), n * .72, G(235)));
	}), e.fillStyle = K(e, 235, 190), Z(e, .65, .29, .39, .43, .025), e.fill(), Q(e, [
		[.14, .88],
		[.88, .88],
		[.8, .74],
		[.7, .67],
		[.74, .53],
		[.73, .29],
		[.59, .12],
		[.43, .07],
		[.34, .24],
		[.18, .33],
		[.09, .5],
		[.15, .59],
		[.36, .56],
		[.43, .47],
		[.46, .59],
		[.3, .75]
	].map(([e, t]) => [.69 + e * .3, .34 + t * .34]), G(5)), Y(e, .846, .34 + .28 * .34, .011, G(230));
	let l = U[7][1];
	n.events.forEach((e, n) => {
		e.kind === "evaluate" && (l = v(l, U[e.node][1], b(y(t, r + n * a, r + (n + 1) * a))));
	});
	let u = n.path.at(-1);
	l = v(l, U[u][1], o);
	let d = .054 * b(y(t, r, r + a));
	J(e, U[u][0], l, d);
}
var ie = Array.from({ length: 3 }, (e, t) => {
	let n = Array.from({ length: 6 }, (e, n) => Number(n === t || n === 5 - t)), r = n.map((e, n) => n === t ? 0 : e);
	return {
		symmetric: n,
		broken: r,
		before: k(n),
		after: k(r)
	};
});
function ae(e, t) {
	let n = y(t, .65, 8.3) * 3, r = Math.min(2, Math.floor(n)), i = n - r, { symmetric: a, broken: o, before: s, after: c } = ie[r], l = b(y(i, .45, .64)), u = [];
	e.fillStyle = K(e, 235, 195), e.fillRect(0, 0, 1, 1);
	for (let t = 0; t < 6; t++) {
		let n = .25 + t * .124;
		for (let a of [-1, 1]) {
			let o = .5 + a * (.245 + (2 - t % 3) * .033), s = [
				[.5, n],
				[o, n],
				[o, .56],
				[.5 + a * .4, .56]
			];
			if (X(e, s, .027, G(5)), t === r || t === 5 - r) {
				let e = i * 2 % 1, t = Math.min(2, Math.floor(e * 3)), n = e * 3 - t, r = s[t], a = s[t + 1];
				u.push([v(r[0], a[0], n), v(r[1], a[1], n)]);
			}
		}
	}
	for (let t = 0; t < 2; t++) {
		let n = t === 0 ? .1 : .9;
		X(e, [
			[n, .56],
			[t === 0 ? .04 : .96, .56],
			[t === 0 ? .04 : .96, .09],
			[.5, .09]
		], .028, G(5)), Y(e, n, .56, .085, G(5)), Y(e, n, .56, .021 + v(s.hidden[t], c.hidden[t], l) * .047, G(245));
	}
	for (let t = 0; t < 6; t++) {
		Y(e, .5, .25 + t * .124, .066, G(5));
		let n = v(a[t], o[t], l);
		Y(e, .5, .25 + t * .124, .046 * n, G(245));
	}
	[
		.34,
		.46,
		.58
	].forEach((t) => {
		e.fillStyle = G(5), e.fillRect(t, .55, .08, .025);
	}), Y(e, .5, .09, .086, G(5)), J(e, .5, .09, .016 + v(s.output, c.output, l) * .062), u.forEach(([t, n]) => J(e, t, n, .027));
}
var oe = [
	0,
	3,
	8,
	11,
	16,
	20,
	24,
	29,
	34,
	37,
	42,
	45
];
function se(e, t, n) {
	let r = y(t, .6, 8.3);
	e.save(), e.translate(-.06 - r * .43, -.12 - r * .62), oe.forEach((t, r) => {
		let i = t % 16, a = Math.floor(t / 16);
		e.drawImage(n, i * 39.5 + 3, a * 41 + 3, 34, 35, r % 3 * .54, Math.floor(r / 3) * .54, .51, .51);
	}), e.restore();
}
function ce(e, t) {
	let n = y(t, .65, 8.3), r = "rgb(235,75,75)";
	e.save(), e.translate(.5, .5), e.rotate(-.12), e.scale(1, .88), e.translate(-.5, -.5);
	let i = v(.092, .105, n), a = ([e, t]) => [.5 + (e - v(10.4, 11, n)) * i, .5 + (t - v(13.8, 14.3, n)) * i];
	e.fillStyle = K(e, 245, 200), e.fillRect(-.5, -1.2, 2, 2.6);
	for (let t = 0; t < 19; t++) X(e, [a([t, 0]), a([t, 18])], .014, G(5)), X(e, [a([0, t]), a([18, t])], .014, G(5));
	for (let t of [
		3,
		9,
		15
	]) for (let n of [
		3,
		9,
		15
	]) {
		let [r, i] = a([t, n]);
		Y(e, r, i, .014, G(5));
	}
	let o = (t, n, r = 0) => {
		let [o, s] = a(t);
		Y(e, o + .008 + r * .15, s + .012, i * .54, G(70)), Y(e, o, s - r, i * .5, G(5)), n && Y(e, o - .002, s - r - .004, i * .35, G(250));
	};
	c.forEach((e) => o(e, !0)), s.forEach((e) => o(e, !1)), t >= .95 && t < 4.7 && (e.save(), e.globalAlpha *= 1 - b(y(t, 4.4, 4.7)), d.forEach(({ point: n, frequency: o }, s) => {
		let [c, l] = a(n), u = .5 + .5 * Math.sin((t - 1) * 1.5 + s * Math.PI);
		e.beginPath(), e.arc(c, l, i * (.5 + u * .07), 0, Math.PI * 2), e.lineWidth = .014 + o / 79 * .004, e.strokeStyle = r, e.stroke();
	}), e.restore());
	for (let [n, i, s, c] of [[
		l,
		!1,
		4.55,
		5.65
	], [
		u,
		!0,
		6.55,
		7.75
	]]) {
		if (t < s) continue;
		let l = (1 - b(y(t, s, c))) * .25;
		if (o(n, i, l), !i) {
			let [t, i] = a(n);
			Y(e, t, i - l, .012, r);
		}
	}
	e.restore();
}
var le = [
	{
		points: [
			[.2, .13],
			[.6, .06],
			[.98, .44],
			[.9, .84]
		],
		width: .19
	},
	{
		points: [
			[.2, .13],
			[.2, .45],
			[.56, .52],
			[.54, .84]
		],
		width: .15
	},
	{
		points: [
			[.2, .13],
			[-.04, .52],
			[.41, .84],
			[.77, .84]
		],
		width: .16
	}
], ue = Array.from({ length: 81 }, (e, t) => {
	let n = t / 80, r = $(Math.max(0, n - .001)), i = $(Math.min(1, n + .001));
	return {
		center: $(n),
		tangent: i.map((e, t) => e - r[t]),
		halfWidth: v(.5, .24, b(n))
	};
});
function de(e, t) {
	let n = y(t, .65, 8.3);
	le.forEach(({ points: [t, r, i, a], width: o }) => {
		fe(e, [
			t,
			[v(.34, r[0], n), v(.31, r[1], n)],
			[v(.49, i[0], n), v(.65, i[1], n)],
			a
		], o);
	}), Q(e, [
		[.115, .085],
		[.28, .085],
		[.28, .15],
		[.13, .175]
	], G(240)), Q(e, [
		[.13, .175],
		[.28, .15],
		[.28, .19],
		[.13, .215]
	], G(95)), Q(e, [
		[.475, .825],
		[.605, .85],
		[.58, .925],
		[.455, .9]
	], G(235)), Q(e, [
		[.72, .815],
		[.955, .84],
		[.945, .925],
		[.705, .9]
	], G(225)), Q(e, [
		[.825, .819],
		[.852, .825],
		[.843, .872],
		[.816, .866]
	], G(5));
}
function fe(e, t, n) {
	let r = ue.map((e) => {
		let [r, i] = he(t, e.center), [a, o] = he(t, e.tangent), s = Math.hypot(a, o), c = n * e.halfWidth;
		return {
			x: r,
			y: i,
			nx: -o / s * c,
			ny: a / s * c
		};
	});
	W(e, r, 0, 4, 5, .025, .02), [
		75,
		125,
		205,
		235
	].forEach((t, n) => W(e, r, n, n + 1, t));
}
function W(e, t, n, r, i, a = 0, o = 0) {
	e.beginPath();
	let s = n / 2 - 1, c = r / 2 - 1;
	for (let n = 0; n < t.length * 2; n++) {
		let r = n < t.length, i = t[r ? n : t.length * 2 - n - 1], l = r ? s : c, u = i.x + i.nx * l + a, d = i.y + i.ny * l + o;
		n === 0 ? e.moveTo(u, d) : e.lineTo(u, d);
	}
	e.closePath(), e.fillStyle = G(i), e.fill();
}
function pe(e) {
	let t = document.createElement("canvas");
	t.width = e.naturalWidth, t.height = e.naturalHeight;
	let n = t.getContext("2d");
	n.drawImage(e, 0, 0);
	let r = n.getImageData(0, 0, t.width, t.height);
	for (let e = 0; e < r.data.length; e += 4) {
		let t = _((r.data[e] * .2126 + r.data[e + 1] * .7152 + r.data[e + 2] * .0722 - 55) * 1.95, 0, 255);
		r.data[e] = r.data[e + 1] = r.data[e + 2] = t;
	}
	return n.putImageData(r, 0, 0), t;
}
function G(e) {
	let t = Math.round(e);
	return `rgb(${t},${t},${t})`;
}
function K(e, t, n) {
	let r = e.createLinearGradient(.1, 0, .9, 1);
	return r.addColorStop(0, G(t)), r.addColorStop(1, G(n)), r;
}
function q(e, t, n, r, i) {
	let a = e.createLinearGradient(t, n, t + r, n + i);
	return a.addColorStop(0, "rgb(255,180,180)"), a.addColorStop(.55, "rgb(255,125,125)"), a.addColorStop(1, "rgb(255,75,75)"), a;
}
function J(e, t, n, r) {
	e.save(), e.beginPath(), e.arc(t, n, r, 0, Math.PI * 2), e.globalCompositeOperation = "multiply", e.fillStyle = "rgb(255,0,255)", e.fill(), e.globalCompositeOperation = "lighten", e.fillStyle = "rgb(255,0,0)", e.fill(), e.restore();
}
function Y(e, t, n, r, i) {
	e.beginPath(), e.arc(t, n, Math.max(0, r), 0, Math.PI * 2), e.fillStyle = i, e.fill();
}
function X(e, t, n, r) {
	me(e, t), e.lineWidth = n, e.strokeStyle = r, e.stroke();
}
function Z(e, t, n, r, i, a) {
	e.beginPath(), e.moveTo(t + a, n), e.arcTo(t + r, n, t + r, n + i, a), e.arcTo(t + r, n + i, t, n + i, a), e.arcTo(t, n + i, t, n, a), e.arcTo(t, n, t + r, n, a), e.closePath();
}
function Q(e, t, n) {
	me(e, t), e.closePath(), e.fillStyle = n, e.fill();
}
function me(e, t) {
	e.beginPath(), e.moveTo(...t[0]);
	for (let n = 1; n < t.length; n++) {
		let [r, i] = t[n];
		e.lineTo(r, i);
	}
}
function $(e) {
	let t = 1 - e;
	return [
		t ** 3,
		3 * t ** 2 * e,
		3 * t * e ** 2,
		e ** 3
	];
}
function he(e, t) {
	let n = (n) => t[0] * e[0][n] + t[1] * e[1][n] + t[2] * e[2][n] + t[3] * e[3][n];
	return [n(0), n(1)];
}
//#endregion
//#region src/lib/hero/shaders.ts
var ge = "\nconst float TILE_PITCH = 1.155;\nfloat viewSize() { return (u_focus >= 0.0 ? 1.06 : mix(3.40, 2.57, u_crop)) / u_zoom; }\nfloat pointScale() { return max(u_resolution.x, u_resolution.y) / viewSize(); }\nvec2 camera() { return vec2(-0.13, 0.0) * u_crop; }\nvec4 project(vec2 world) {\n  if (u_focus < 0.0) world -= camera();\n  return vec4(world * vec2(2.0, -2.0) * pointScale() / u_resolution, 0.0, 1.0);\n}\n", _e = `#version 300 es
precision highp float;
uniform sampler2D u_atlas;
uniform vec2 u_resolution;
uniform vec4 u_rosettes;
uniform float u_time, u_grid, u_size, u_jitter, u_focus, u_crop, u_zoom, u_reveal, u_imperfection;
uniform float u_palette_delay, u_red_advance, u_red_restraint, u_colour_waves, u_micro_jitter, u_soft_red, u_colour_contrast;
out vec3 v_color;
out float v_alpha, v_angle;
const float REVEAL_STARTS[9] = float[9](${m.map((e) => e.toFixed(6)).join(", ")});
${ge}
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
const vec3 BLUE = vec3(0.36, 0.56, 0.88);
const vec3 VIOLET = vec3(0.55, 0.19, 0.88);
const vec3 RED = vec3(0.90, 0.12, 0.23);

vec3 redInk() {
  return u_soft_red > 0.5 ? vec3(0.86, 0.20, 0.28) : RED;
}

vec3 grade(float warmth) {
  vec3 color = mix(BLUE, VIOLET, smoothstep(0.0, 0.52, warmth));
  return mix(color, redInk(), smoothstep(0.48, 1.0, warmth));
}

vec3 contrastGrade(float warmth, float toViolet, float toRed) {
  // Preserve the opening ink roles instead of merging all shading into the
  // surface colour. Each exchange follows the same local front as its surface.
  vec3 base = mix(mix(BLUE, VIOLET, toViolet), redInk(), toRed);
  vec3 detail = mix(VIOLET, BLUE, toViolet);
  vec3 ink = mix(redInk(), VIOLET, toRed);
  vec3 color = mix(base, detail, smoothstep(0.0, 0.52, warmth));
  return mix(color, ink, smoothstep(0.48, 1.0, warmth));
}

float surfaceTone(vec2 tile, vec2 uv) {
  // B retains the underlay beneath contact-aware accents. Clamp within the
  // current tile so edge probes never borrow a neighbouring motif's ink.
  vec2 inset = 1.5 / vec2(textureSize(u_atlas, 0));
  return texture(u_atlas, (tile + clamp(uv, inset, 1.0 - inset)) / 3.0).b;
}

float coverageNoise(vec2 p) {
  vec2 cell = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), f.x),
             mix(hash(cell + vec2(0.0, 1.0)), hash(cell + 1.0), f.x), f.y);
}

float colourArrival(vec2 tile, vec2 uv, vec2 cell) {
  // A separate, low-frequency field: minima seed patches that expand and merge
  // as the threshold rises. Nearby dots share a front, not a single global tint.
  vec2 offset = tile * vec2(23.7, 41.3) + vec2(137.0, 293.0);
  float field = mix(coverageNoise(uv * 5.0 + offset), coverageNoise(uv * 13.0 + offset + 67.0), 0.18);
  float arrival = smoothstep(0.12, 0.88, field);
  return clamp(arrival + 0.035 * (hash(cell + tile * 83.1 + 521.0) - 0.5), 0.0, 1.0);
}

float missingCoverage(vec2 tile, vec2 uv, vec4 neighbours, float contour) {
  // Thin strokes and small islands must not disappear. Measure support along
  // four short rays, including intermediate samples so narrow cuts aren't skipped.
  vec4 support = neighbours;
  for (int i = 0; i < 2; i++) {
    float d = (i == 0 ? 2.5 : 4.5) / 104.0;
    support = min(support, vec4(surfaceTone(tile, uv + vec2(d, 0.0)), surfaceTone(tile, uv - vec2(d, 0.0)),
                                surfaceTone(tile, uv + vec2(0.0, d)), surfaceTone(tile, uv - vec2(0.0, d))));
  }
  float broad = smoothstep(0.55, 0.85, dot(smoothstep(vec4(0.25), vec4(0.75), support), vec4(0.25)));
  if (broad == 0.0) return 0.0;
  // Fixed in the tile's sampling coordinates, never reseeded by time, palette
  // or treatment. Higher amounts remove a superset of the same candidate dots.
  vec2 offset = tile * vec2(37.1, 53.7) + 19.3;
  float coarse = coverageNoise(uv * 12.0 + offset);
  float fine = coverageNoise(uv * 32.0 + offset + 71.0);
  float amount = clamp(u_imperfection, 0.0, 1.0);
  float patches = 1.0 - smoothstep(0.14 + amount * 0.24, 0.40 + amount * 0.24, mix(coarse, fine, 0.27));
  float chips = contour * (1.0 - smoothstep(0.36, 0.66, fine));
  float loss = amount * broad * (0.05 + 0.92 * patches + 0.6 * chips);
  // Big empty blobs could be mistaken for extra observations or Go stones.
  // Their surfaces, and the tape around its digits, receive gentler dropout.
  // These protection slots refer to the approved nine-work arrangement.
  float slot = tile.y * 3.0 + tile.x;
  float limit = slot == 0.0 ? 0.30 : (slot == 2.0 || slot == 4.0 ? 0.18 : 0.94);
  return min(loss, limit * amount);
}

void rosette(float vertex) {
  float flower = floor(vertex / 13.0);
  float petal = mod(vertex, 13.0);
  float phase = u_rosettes[int(flower)];
  float seed = hash(vec2(petal, flower));
  bool red = phase > 0.0;
  float rank = petal < 7.0 ? petal * 0.07 : 0.53 + (petal - 7.0) * 0.065;
  // Integer cycles keep the visible opening flowers continuous at the seam.
  float cycle = u_time * 6.28318530718 / ${f};
  float sparkle = mix(red ? 0.8 : 0.35, 1.0, pow(0.5 + 0.5 * sin(cycle * 10.0 - petal * 1.7 + flower * 2.0), 2.0));
  float angle = (petal - 1.0) * 1.0472 + (petal > 6.0 ? 0.52 : 0.0);
  angle += 0.16 * sin(cycle + flower * 1.7);
  float radius = petal == 0.0 ? 0.0 : (petal < 7.0 ? 0.014 : 0.021);
  radius *= 0.92 + 0.08 * sin(cycle * 6.0 - rank * 3.0);
  vec2 junction = (vec2(mod(flower, 2.0), floor(flower / 2.0)) - 0.5) * TILE_PITCH;
  vec2 position = vec2(cos(angle), sin(angle)) * radius;
  position += (vec2(seed, hash(vec2(petal + 19.0, flower))) - 0.5) * 0.003;
  gl_Position = project(junction + position);
  gl_PointSize = max(1.0, pointScale() * 0.0065 * mix(0.9, 1.15, sparkle));
  v_angle = (seed - 0.5) * 0.5;
  v_alpha = smoothstep(rank, rank + 0.18, abs(phase)) * sparkle;
  const vec3 blue = vec3(0.31, 0.57, 0.95);
  v_color = red ? mix(redInk(), blue, step(0.91, seed)) : blue;
}

void main() {
  float perTile = u_grid * u_grid;
  if (float(gl_VertexID) >= perTile * 9.0) {
    rosette(float(gl_VertexID) - perTile * 9.0);
    return;
  }
  float tile = floor(float(gl_VertexID) / perTile);
  float id = mod(float(gl_VertexID), perTile);
  vec2 cell = vec2(mod(id, u_grid), floor(id / u_grid));
  vec2 uv = (cell + 0.5) / u_grid;
  vec2 atlasCell = vec2(mod(tile, 3.0), floor(tile / 3.0));
  vec3 sampleColor = texture(u_atlas, (atlasCell + uv) / 3.0).rgb;
  float tone = sampleColor.r;
  float seed = hash(cell + tile * 193.1);
  float other = hash(cell.yx + tile * 71.7 + 18.2);
  float accent = max(sampleColor.r - sampleColor.g, 0.0);

  vec2 jitter = vec2(seed - 0.5, other - 0.5) * u_jitter;
  jitter += 0.06 * sin(vec2(u_time * 1.7, -u_time * 1.3) + vec2(seed, other) * 6.283);
  if (u_micro_jitter > 0.0) {
    // Independent phases, continuous per-frame drift, and integer loop cycles.
    // No new random positions at each frame; flowers use their own motion above.
    float cycle = u_time * 6.28318530718 / ${f};
    jitter += u_micro_jitter * sin(vec2(cycle * 31.0, cycle * 43.0) + vec2(seed, other) * 6.283);
  }
  vec2 world = uv - 0.5 + jitter / u_grid;
  if (u_focus < 0.0) world += (atlasCell - 1.0) * TILE_PITCH;
  gl_Position = project(world);
  gl_PointSize = max(1.0, pointScale() / u_grid * u_size * 1.5 * mix(0.9, 1.1, other));
  v_angle = (seed - 0.5) * 0.6 + 0.1 * sin(u_time + other * 6.283);

  // Violet belongs to the form: narrow inner contours and tonal relief,
  // not a moving UV gradient.
  float d = 1.1 / u_grid;
  vec4 neighbours = vec4(surfaceTone(atlasCell, uv + vec2(d, 0.0)), surfaceTone(atlasCell, uv - vec2(d, 0.0)),
                         surfaceTone(atlasCell, uv + vec2(0.0, d)), surfaceTone(atlasCell, uv - vec2(0.0, d)));
  float low = min(min(neighbours.x, neighbours.y), min(neighbours.z, neighbours.w));
  float surface = sampleColor.b;
  float contour = smoothstep(0.12, 0.5, surface - low) * smoothstep(0.1, 0.4, surface);
  float relief = 0.4 * (1.0 - smoothstep(0.25, 0.85, surface));
  // The approved grade reaches violet around 13 seconds. Shift only this
  // clock, without wrapping negative opening times into the red ending.
  float paletteTime = u_time - max(0.0, u_palette_delay);
  float toViolet = smoothstep(3.6, 5.8, paletteTime);
  float toRed = smoothstep(5.8, 8.0, paletteTime + max(0.0, u_red_advance));
  if (u_colour_waves > 0.5) {
    float restraint = clamp(u_red_restraint, 0.0, 1.0);
    float arrival = 0.92 * colourArrival(atlasCell, uv, cell);
    toViolet = smoothstep(arrival, arrival + 0.08, toViolet);
    // Let a few red seeds establish before the spread accelerates near the
    // outro. Restraint limits how far the front travels, not the red pigment.
    float redFront = toRed * toRed * sqrt(toRed) * (1.0 - restraint);
    toRed = smoothstep(arrival, arrival + 0.08, redFront);
  }
  bool contrast = u_colour_contrast > 0.5 && (toViolet > 0.0 || toRed > 0.0);
  float detailWarmth = 0.38 * max(contour, relief);
  float surfaceWarmth = mix(mix(detailWarmth, 0.5, toViolet), 1.0, toRed);
  vec3 accentInk = redInk();
  v_color = grade(surfaceWarmth);
  if (contrast) {
    v_color = contrastGrade(detailWarmth, toViolet, toRed);
    accentInk = mix(accentInk, VIOLET, toRed);
  }
  bool overprint = sampleColor.b > sampleColor.g + 0.001 || (sampleColor.g < 0.001 && accent > 0.05);
  if (overprint) {
    // Actual underlay, not random flecks. Normalize by combined occupancy so
    // antialiased ink over empty navy keeps its intended colour.
    float support = smoothstep(0.08, 0.62, sampleColor.b);
    vec3 contact = contrast
      ? contrastGrade(mix(detailWarmth, 1.0, 0.5), toViolet, toRed)
      : grade(mix(surfaceWarmth, 1.0, 0.5));
    vec3 ink = mix(accentInk, contact, support);
    v_color = mix(v_color, ink, clamp(accent / max(tone, 0.001), 0.0, 1.0));
  } else {
    // Other reading accents retain their existing partial-ink treatment.
    float warmth = smoothstep(0.3, 0.7, accent);
    float stipple = smoothstep(seed - 0.12, seed + 0.12, warmth);
    warmth = mix(warmth, stipple, 4.0 * warmth * (1.0 - warmth));
    v_color = mix(v_color, accentInk, warmth);
  }
  v_color *= mix(0.88, 1.06, tone) * mix(0.9, 1.0, seed);

  // Preserve tonal masses. Black ink stays empty; midtone surfaces stay
  // filled. Occupancy is spatial, not random per frame.
  float occupied = step(other * 0.98 + 0.01, smoothstep(0.10, 0.62, tone));
  if (u_imperfection > 0.0 && occupied > 0.0 && accent < 0.001) {
    float loss = missingCoverage(atlasCell, uv, neighbours, contour);
    occupied *= step(loss, hash(cell + tile * 43.7 + 891.0));
  }
  float arrival = REVEAL_STARTS[int(tile)] + ${h} * seed;
  float enter = smoothstep(arrival, arrival + ${ee}, u_time);
  float leave = 1.0 - smoothstep(8.3, 8.88, u_time);
  v_alpha = occupied * mix(1.0, enter * leave, u_reveal);
}
`, ve = "#version 300 es\nprecision highp float;\nin vec3 v_color;\nin float v_alpha, v_angle;\nout vec4 color;\nvoid main() {\n  vec2 p = gl_PointCoord - 0.5;\n  float c = cos(v_angle), s = sin(v_angle);\n  p = mat2(c, -s, s, c) * p;\n  float d = max(abs(p.x), abs(p.y));\n  float a = (1.0 - smoothstep(0.30, 0.36, d)) * v_alpha;\n  if (a < 0.01) discard;\n  color = vec4(v_color, a);\n}\n", ye = "#version 300 es\nvoid main() {\n  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));\n  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);\n}\n", be = `#version 300 es
precision highp float;
uniform sampler2D u_atlas;
uniform vec2 u_resolution;
uniform float u_focus, u_crop, u_zoom;
out vec4 color;
${ge}
void main() {
  vec2 world = (gl_FragCoord.xy - u_resolution * 0.5) / max(u_resolution.x, u_resolution.y);
  world.y *= -1.0;
  world *= viewSize();
  vec2 cell;
  vec2 uv;
  if (u_focus >= 0.0) {
    cell = vec2(mod(u_focus, 3.0), floor(u_focus / 3.0));
    uv = world + 0.5;
  } else {
    world += camera();
    cell = floor(world / TILE_PITCH + 1.5);
    uv = world - (cell - 1.0) * TILE_PITCH + 0.5;
  }
  color = vec4(0.016, 0.016, 0.161, 1.0);
  if (any(lessThan(cell, vec2(0))) || any(greaterThan(cell, vec2(2)))) return;
  if (any(lessThan(uv, vec2(0))) || any(greaterThan(uv, vec2(1)))) return;
  vec3 sampleColor = texture(u_atlas, (cell + uv) / 3.0).rgb;
  // Decode the overprint channel for the tonal-mask inspection view.
  color = vec4(sampleColor.r, vec2(max(sampleColor.g, sampleColor.b)), 1.0);
}
`, xe = {
	focus: -1,
	crop: !1,
	zoom: 1,
	masks: !1,
	grid: 104,
	size: .68,
	jitter: .2,
	reveal: !0,
	imperfection: 0,
	paletteDelay: 0,
	redAdvance: 0,
	colourContrast: !1,
	redRestraint: 0,
	colourWaves: !1,
	microJitter: 0,
	softRed: !1
}, Se = class {
	canvas;
	gl;
	atlas;
	texture = null;
	points = null;
	masks = null;
	lastTime = NaN;
	phase = 0;
	rosettes = /* @__PURE__ */ new Float32Array(4);
	constructor(e, t, n = r) {
		this.canvas = e;
		let i = e.getContext("webgl2", {
			alpha: !1,
			antialias: !1,
			depth: !1,
			powerPreference: "low-power"
		});
		if (!i) throw Error("WebGL 2 is unavailable. Showing the static artwork instead.");
		this.gl = i, this.atlas = F(t, n);
		try {
			if (this.points = we(i, _e, ve), this.masks = we(i, ye, be), this.texture = i.createTexture(), !this.texture) throw Error("Unable to allocate the artwork texture.");
			i.bindTexture(i.TEXTURE_2D, this.texture), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texStorage2D(i.TEXTURE_2D, 1, i.RGBA8, this.atlas.canvas.width, this.atlas.canvas.height), i.clearColor(4 / 255, 4 / 255, 41 / 255, 1), i.enable(i.BLEND), i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA);
		} catch (e) {
			throw this.dispose(), e;
		}
	}
	resize(e, t, n = window.devicePixelRatio) {
		let r = Math.min(n, 2, 1600 / Math.max(e, t, 1)), i = Math.max(1, Math.round(e * r)), a = Math.max(1, Math.round(t * r));
		(this.canvas.width !== i || this.canvas.height !== a) && (this.canvas.width = i, this.canvas.height = a, this.gl.viewport(0, 0, i, a));
	}
	render(e, t = xe) {
		let n = this.gl;
		if (n.isContextLost() || !this.points || !this.masks) return;
		let r = x(e);
		if (n.bindTexture(n.TEXTURE_2D, this.texture), r !== this.lastTime) {
			this.atlas.draw(r), n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, n.RGBA, n.UNSIGNED_BYTE, this.atlas.canvas), this.phase = S(r);
			for (let e = 0; e < this.rosettes.length; e++) this.rosettes[e] = w(r, e);
			this.lastTime = r;
		}
		let i = t.masks ? this.masks : this.points;
		n.useProgram(i.handle);
		let a = i.uniforms;
		if (n.uniform1i(a.u_atlas, 0), n.uniform2f(a.u_resolution, this.canvas.width, this.canvas.height), n.uniform1f(a.u_focus, t.focus), n.uniform1f(a.u_crop, Number(t.crop)), n.uniform1f(a.u_zoom, t.zoom), n.clear(n.COLOR_BUFFER_BIT), t.masks) n.drawArrays(n.TRIANGLES, 0, 3);
		else {
			n.uniform1f(a.u_time, this.phase), n.uniform4fv(a.u_rosettes, this.rosettes), n.uniform1f(a.u_grid, t.grid), n.uniform1f(a.u_size, t.size), n.uniform1f(a.u_jitter, t.jitter), n.uniform1f(a.u_reveal, Number(t.reveal)), n.uniform1f(a.u_imperfection, t.imperfection), n.uniform1f(a.u_palette_delay, t.paletteDelay * p), n.uniform1f(a.u_red_advance, t.redAdvance * p), n.uniform1f(a.u_colour_contrast, Number(t.colourContrast)), n.uniform1f(a.u_red_restraint, t.redRestraint), n.uniform1f(a.u_colour_waves, Number(t.colourWaves)), n.uniform1f(a.u_micro_jitter, t.microJitter), n.uniform1f(a.u_soft_red, Number(t.softRed));
			let e = t.grid ** 2;
			n.drawArrays(n.POINTS, t.focus < 0 ? 0 : t.focus * e, t.focus < 0 ? e * 9 + 52 : e);
		}
	}
	dispose() {
		this.points && this.gl.deleteProgram(this.points.handle), this.masks && this.gl.deleteProgram(this.masks.handle), this.texture && this.gl.deleteTexture(this.texture), this.points = this.masks = null, this.texture = null;
	}
}, Ce = [
	"u_atlas",
	"u_resolution",
	"u_time",
	"u_grid",
	"u_size",
	"u_jitter",
	"u_focus",
	"u_crop",
	"u_zoom",
	"u_reveal",
	"u_rosettes",
	"u_imperfection",
	"u_palette_delay",
	"u_red_advance",
	"u_colour_contrast",
	"u_red_restraint",
	"u_colour_waves",
	"u_micro_jitter",
	"u_soft_red"
];
function we(e, t, n) {
	let r = e.createProgram();
	if (!r) throw Error("Unable to allocate a shader program.");
	let i = [];
	try {
		for (let [a, o] of [[e.VERTEX_SHADER, t], [e.FRAGMENT_SHADER, n]]) {
			let t = e.createShader(a);
			if (!t) throw Error("Unable to allocate a shader.");
			if (i.push(t), e.shaderSource(t, o), e.compileShader(t), !e.getShaderParameter(t, e.COMPILE_STATUS)) throw Error(e.getShaderInfoLog(t) ?? "Shader compilation failed.");
			e.attachShader(r, t);
		}
		if (e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS)) throw Error(e.getProgramInfoLog(r) ?? "Shader linking failed.");
		return {
			handle: r,
			uniforms: Object.fromEntries(Ce.map((t) => [t, e.getUniformLocation(r, t)]))
		};
	} catch (t) {
		throw e.deleteProgram(r), t;
	} finally {
		i.forEach((t) => e.deleteShader(t));
	}
}
//#endregion
//#region src/lib/hero/minify.ts
function Te() {
	let e = Array.from({ length: 2 }, () => {
		let e = document.createElement("canvas").getContext("2d", { alpha: !1 });
		if (!e) throw Error("Canvas 2D is unavailable.");
		return e;
	});
	return (t, n) => {
		let r = t, i = t.width, a = 0, o = n.canvas.width;
		for (; i > o * 2;) {
			i = Math.floor(i / 2);
			let t = e[a % 2], n = t.canvas;
			n.width !== i && (n.width = i, n.height = i), t.drawImage(r, 0, 0, i, i), r = n, a++;
		}
		n.imageSmoothingQuality = "high", n.drawImage(r, 0, 0, o, o);
	};
}
//#endregion
//#region src/lib/hero/background.ts
function Ee(r, { assets: i = new URL(
	/* @vite-ignore */
	".",
	import.meta.url
), focus: a = -1, crop: o = !0, autoplay: s = !0, stillTime: c = e } = {}) {
	let l = r.querySelector("[data-motifs-canvas]"), u = r.querySelector("[data-motifs-poster]"), d = r.querySelector("[data-motifs-toggle]"), f = matchMedia("(prefers-reduced-motion: reduce)"), p = new AbortController(), m = { signal: p.signal }, ee = {
		...xe,
		...n,
		focus: a,
		crop: o,
		zoom: o && a < 0 ? t : 1
	}, h = new Image(), g = o ? l : document.createElement("canvas"), _ = null, v = null, y = null, b = s && !f.matches ? 0 : Math.round(c * 30), x = Math.floor(b), S = null, C = 0, w = s && !f.matches, T = !1, E = !1, D = !1, O = !1, k = !1, A = matchMedia(`(resolution: ${devicePixelRatio}dppx)`);
	d?.addEventListener("click", () => {
		w = !w, N();
	}, m), f.addEventListener("change", () => {
		f.matches && (w = !1, b = Math.round(c * 30), x = Math.floor(b), L()), N();
	}, m), document.addEventListener("visibilitychange", z, m), window.addEventListener("resize", I, m), window.addEventListener("pagehide", (e) => {
		e.persisted ? (E = !0, N()) : H();
	}, m), window.addEventListener("pageshow", (e) => {
		e.persisted && (E = !1, z());
	}, m), g.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), V(/* @__PURE__ */ Error("Graphics context lost."));
	}, m), g.addEventListener("webglcontextrestored", () => {
		D || (k = !1, P(!0));
	}, m), A.addEventListener("change", B, m);
	let j = new ResizeObserver(I);
	j.observe(r);
	let M = new IntersectionObserver((e) => {
		T = e[e.length - 1].isIntersecting, z();
	});
	return M.observe(r), r.dataset.renderer = w ? "loading" : "poster", u.hidden = w, r.dataset.frame = String(x), N(), H;
	function N() {
		cancelAnimationFrame(C), C = 0, S = null, !w && r.dataset.renderer === "loading" && (b = Math.round(c * 30), x = Math.floor(b), r.dataset.frame = String(x), r.dataset.renderer = "poster", u.hidden = !1);
		let e = !!_ && w && R();
		r.dataset.playing = String(e), d && (d.hidden = k || D, d.textContent = w ? "Pause animation" : "Play animation"), e ? C = requestAnimationFrame(F) : !_ && !k && w && R() && P();
	}
	async function P(e = !1) {
		if (!(O || D || _)) {
			O = !0;
			try {
				if (h.src ||= new URL("alexnet-filters.png", i).href, await h.decode(), D || k || !e && (!w || !R())) return;
				if (g !== l) {
					if (v = l.getContext("2d", { alpha: !1 }), !v) throw Error("Canvas 2D is unavailable.");
					y = Te();
				}
				_ = new Se(g, h), I();
			} catch (e) {
				V(e);
			} finally {
				O = !1, D || N();
			}
		}
	}
	function F(e) {
		if (C = 0, !_ || !w || !R()) {
			S = null;
			return;
		}
		S !== null && (b = (b + (e - S) * 30 / 1e3) % 600), S = e;
		let t = Math.floor(b);
		t !== x && (x = t, L()), _ && (C = requestAnimationFrame(F));
	}
	function I() {
		if (!_ || !R()) return;
		l.hidden = !1;
		let e = l.getBoundingClientRect(), t = Math.min(1600, Math.max(1, Math.round(Math.max(e.width, e.height) * Math.min(devicePixelRatio, 2))));
		v && (l.width !== t || l.height !== t) && (l.width = t, l.height = t), _.resize(Math.max(1200, t), Math.max(1200, t), 1), L();
	}
	function L() {
		if (_ && !D && R()) try {
			_.render(x / 30, ee), v && y && y(g, v), u.hidden = !0, r.dataset.renderer = "webgl2", delete r.dataset.error, r.dataset.frame = String(x);
		} catch (e) {
			V(e);
		}
	}
	function R() {
		return T && !document.hidden && !E && !D;
	}
	function z() {
		I(), N();
	}
	function B() {
		A.removeEventListener("change", B), A = matchMedia(`(resolution: ${devicePixelRatio}dppx)`), A.addEventListener("change", B, m), I();
	}
	function V(e) {
		_?.dispose(), _ = null, v = null, y = null, k = !0, l.hidden = !0, u.hidden = !1, r.dataset.renderer = "fallback", r.dataset.error = e instanceof Error ? e.message : "Animation unavailable.", N();
	}
	function H() {
		D || (D = !0, w = !1, N(), p.abort(), j.disconnect(), M.disconnect(), _?.dispose(), _ = null, v = null, y = null, g.width = g.height = 1, l.hidden = !0, l.width = l.height = 1, u.hidden = !1, r.dataset.renderer = "poster");
	}
}
//#endregion
export { e as HOMEPAGE_STILL_TIME, t as HOMEPAGE_ZOOM, Ee as mountMotifs };

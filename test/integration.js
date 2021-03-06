const path = require('path');
const { tests } = require('@iobroker/testing');

const server = require('../lib/fritz/fritz_mockserver.js');

const expect = require('chai').expect;

function encrypt(key, value) {
	let result = '';
	for (let i = 0; i < value.length; ++i) {
		result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
	}
	return result;
}

function delay(t, val) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(val);
		}, t);
	});
}

// Run integration tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.integration(path.join(__dirname, '..'), {
	// This should be the adapter's root directory

	// If the adapter may call process.exit during startup, define here which exit codes are allowed.
	// By default, termination during startup is not allowed.
	allowedExitCodes: [ 11 ],

	// Define your own tests inside defineAdditionalTests
	// Since the tests are heavily instrumented, you need to create and use a so called "harness" to control the tests.
	defineAdditionalTests(getHarness) {
		describe('Test creation of devices', () => {
			before('start the emulation', () => {
				server.setupHttpServer(function() {});
			});
			/*
			// should work but doesnt
			it('Should work to send a message', () => {
				return new Promise( (resolve) => {
					// Create a fresh harness instance each test!
					const harness = getHarness();
					// Start the adapter and wait until it has started
					await harness.startAdapterAndWait();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						// Perform the actual test:
						harness.sendTo('fritzdect.0', 'test', 'message', (resp) => {
							console.dir(resp);
							resolve();
						});
					});
				});
			}).timeout(20000);
			*/
			it('Fritzdect 200 schould be created', () => {
				return new Promise((resolve) => {
					// Create a fresh harness instance each test!
					const harness = getHarness();
					// modification of some starting values

					//schon Teil des iobroker/testing :-)
					//config.common.enabled = true;
					//config.common.loglevel = 'debug';
					// systemConfig.native.secret ='Zgfr56gFe87jJOM'

					//await delay (15000);

					//man könnte auch je device ein json array der datenpunkte und der erwarteten Werte anlegen und dann eine loop

					//this refers to https://github.com/ioBroker/testing/issues/218
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);

						harness.states.getState('fritzdect.0.DECT_087610006161.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_087610006161.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_087610006161.productname      ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!DECT 200');
							harness.states.getState('fritzdect.0.DECT_087610006161.manufacturer', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_087610006161.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_087610006161.manufacturer  ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_087610006161.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_087610006161.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_087610006161.fwversion     ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('03.87');
									harness.states.getState('fritzdect.0.DECT_087610006161.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_087610006161.id" not set');
										} else {
											console.log('fritzdect.0.DECT_087610006161.id            ... ' + state.val);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('16');
										harness.states.getState('fritzdect.0.DECT_087610006161.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_087610006161.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_087610006161.name          ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('FRITZ!DECT 200 #1');
											harness.states.getState('fritzdect.0.DECT_087610006161.state', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_087610006161.state" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_087610006161.state         ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState(
													'fritzdect.0.DECT_087610006161.celsius',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_087610006161.celsius" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_087610006161.celsius          ... ' +
																	state.val
															);
														}
														expect(state.val).to.exist;
														expect(state.val).to.be.equal(22.5);
														harness.states.getState(
															'fritzdect.0.DECT_087610006161.voltage',
															function(err, state) {
																if (err) console.error(err);
																expect(state).to.exist;
																if (!state) {
																	console.error(
																		'state "fritzdect.0.DECT_087610006161.voltage" not set'
																	);
																} else {
																	console.log(
																		'fritzdect.0.DECT_087610006161.voltage       ... ' +
																			state.val
																	);
																}
																expect(state.val).to.exist;
																expect(state.val).to.be.equal(224.645);
																harness.states.getState(
																	'fritzdect.0.DECT_087610006161.power',
																	function(err, state) {
																		if (err) console.error(err);
																		expect(state).to.exist;
																		if (!state) {
																			console.error(
																				'state "fritzdect.0.DECT_087610006161.power" not set'
																			);
																		} else {
																			console.log(
																				'fritzdect.0.DECT_087610006161.power         ... ' +
																					state.val
																			);
																		}
																		expect(state.val).to.exist;
																		expect(state.val).to.be.equal(0);
																		harness.states.getState(
																			'fritzdect.0.DECT_087610006161.energy',
																			function(err, state) {
																				if (err) console.error(err);
																				expect(state).to.exist;
																				if (!state) {
																					console.error(
																						'state "fritzdect.0.DECT_087610006161.energy" not set'
																					);
																				} else {
																					console.log(
																						'fritzdect.0.DECT_087610006161.energy        ... ' +
																							state.val
																					);
																					expect(state.val).to.exist;
																					expect(state.val).to.be.equal(
																						104560
																					);
																					resolve();
																				}
																			}
																		);
																	}
																);
															}
														);
													}
												);
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Fritzdect 300 (Comet) should be created', () => {
				return new Promise((resolve) => {
					// Create a fresh harness instance each test!
					const harness = getHarness();
					// modification of some starting values

					//schon Teil des iobroker/testing :-)
					//config.common.enabled = true;
					//config.common.loglevel = 'debug';
					// systemConfig.native.secret ='Zgfr56gFe87jJOM'

					//await delay (15000);
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_117951022222.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_117951022222.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_117951022222.productname        ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Comet DECT');
							harness.states.getState('fritzdect.0.DECT_117951022222.manufacturer', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_117951022222.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_117951022222.manufacturer    ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_117951022222.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_117951022222.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_117951022222.fwversion       ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('03.54');
									harness.states.getState('fritzdect.0.DECT_117951022222.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_117951022222.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_117951022222.id              ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('20');
										harness.states.getState('fritzdect.0.DECT_117951022222.devicelock', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_117951022222.devicelock" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_117951022222.devicelock        ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal(true);
											harness.states.getState('fritzdect.0.DECT_117951022222.present', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_117951022222.present" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_117951022222.present         ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState('fritzdect.0.DECT_117951022222.lock', function(
													err,
													state
												) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_117951022222.lock" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_117951022222.lock            ... ' +
																state.val
														);
													}
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(false);
													harness.states.getState(
														'fritzdect.0.DECT_117951022222.komfort',
														function(err, state) {
															if (err) console.error(err);
															expect(state).to.exist;
															if (!state) {
																console.error(
																	'state "fritzdect.0.DECT_117951022222.komfort" not set'
																);
															} else {
																console.log(
																	'fritzdect.0.DECT_117951022222.komfort        ... ' +
																		state.val
																);
															}
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(19);
															harness.states.getState(
																'fritzdect.0.DECT_117951022222.absenk',
																function(err, state) {
																	if (err) console.error(err);
																	expect(state).to.exist;
																	if (!state) {
																		console.error(
																			'state "fritzdect.0.DECT_117951022222.absenk" not set'
																		);
																	} else {
																		console.log(
																			'fritzdect.0.DECT_117951022222.absenk        ... ' +
																				state.val
																		);
																	}
																	expect(state.val).to.exist;
																	expect(state.val).to.be.equal(15);
																	harness.states.getState(
																		'fritzdect.0.DECT_117951022222.tist',
																		function(
																			/// hier noch was tun
																			err,
																			state
																		) {
																			if (err) console.error(err);
																			expect(state).to.exist;
																			if (!state) {
																				console.error(
																					'state "fritzdect.0.DECT_117951022222.tist" not set'
																				);
																			} else {
																				console.log(
																					'fritzdect.0.DECT_117951022222.tist        ... ' +
																						state.val
																				);
																			}
																			expect(state.val).to.exist;
																			expect(state.val).to.be.equal(20);
																			harness.states.getState(
																				'fritzdect.0.DECT_117951022222.celsius',
																				function(err, state) {
																					if (err) console.error(err);
																					expect(state).to.exist;
																					if (!state) {
																						console.error(
																							'state "fritzdect.0.DECT_117951022222.celsius" not set'
																						);
																					} else {
																						console.log(
																							'fritzdect.0.DECT_117951022222.celsius            ... ' +
																								state.val
																						);
																					}
																					expect(state.val).to.exist;
																					expect(state.val).to.be.equal(20);
																					harness.states.getState(
																						'fritzdect.0.DECT_117951022222.battery',
																						function(err, state) {
																							if (err) console.error(err);
																							expect(state).to.exist;
																							if (!state) {
																								console.error(
																									'state "fritzdect.0.DECT_117951022222.battery" not set'
																								);
																							} else {
																								console.log(
																									'fritzdect.0.DECT_117951022222.battery          ... ' +
																										state.val
																								);
																								expect(state.val).to
																									.exist;
																								expect(
																									state.val
																								).to.be.equal(80);
																							}
																							harness.states.getState(
																								'fritzdect.0.DECT_117951022222.tchange',
																								function(err, state) {
																									if (err)
																										console.error(
																											err
																										);
																									expect(state).to
																										.exist;
																									if (!state) {
																										console.error(
																											'state "fritzdect.0.DECT_117951022222.tchange" not set'
																										);
																									} else {
																										console.log(
																											'fritzdect.0.DECT_117951022222.tchange          ... ' +
																												state.val
																										);
																										expect(
																											state.val
																										).to.exist;
																										expect(
																											state.val
																										).to.be.equal(
																											22
																										);
																									}
																									harness.states.getState(
																										'fritzdect.0.DECT_117951022222.endperiod',
																										function(
																											err,
																											state
																										) {
																											if (err)
																												console.error(
																													err
																												);
																											expect(
																												state
																											).to.exist;
																											if (
																												!state
																											) {
																												console.error(
																													'state "fritzdect.0.DECT_117951022222.endperiod" not set'
																												);
																											} else {
																												console.log(
																													'fritzdect.0.DECT_117951022222.endperiod          ... ' +
																														state.val
																												);
																												expect(
																													state.val
																												).to
																													.exist;
																												expect(
																													state.val
																												).to.be.equal(
																													'Wed Jan 04 2034 07:00:00 GMT+0000 (Coordinated Universal Time)'
																												);
																												resolve();
																											}
																										}
																									);
																								}
																							);
																						}
																					);
																				}
																			);
																		}
																	);
																}
															);
														}
													);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Fritzdect 300 Comet2 should be created', () => {
				return new Promise((resolve) => {
					// Create a fresh harness instance each test!
					const harness = getHarness();
					// modification of some starting values

					//schon Teil des iobroker/testing :-)
					//config.common.enabled = true;
					//config.common.loglevel = 'debug';
					// systemConfig.native.secret ='Zgfr56gFe87jJOM'

					//await delay (15000);

					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_117951033333.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_117951033333.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_117951033333.productname        ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Comet DECT window und boost');
							harness.states.getState('fritzdect.0.DECT_117951033333.manufacturer', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_117951033333.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_117951033333.manufacturer    ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_117951033333.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_117951033333.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_11795103333.fwversion       ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('03.54');
									harness.states.getState('fritzdect.0.DECT_117951033333.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_117951033333.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_117951033333.id              ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('20');
										harness.states.getState('fritzdect.0.DECT_117951033333.devicelock', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_117951033333.devicelock" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_117951033333.devicelock        ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal(true);
											harness.states.getState('fritzdect.0.DECT_117951033333.present', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_117951033333.present" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_117951033333.present         ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState('fritzdect.0.DECT_117951033333.lock', function(
													err,
													state
												) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_117951033333.lock" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_117951033333.lock            ... ' +
																state.val
														);
													}
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(false);
													harness.states.getState(
														'fritzdect.0.DECT_117951033333.komfort',
														function(err, state) {
															if (err) console.error(err);
															expect(state).to.exist;
															if (!state) {
																console.error(
																	'state "fritzdect.0.DECT_117951033333.komfort" not set'
																);
															} else {
																console.log(
																	'fritzdect.0.DECT_117951033333.komfort        ... ' +
																		state.val
																);
															}
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(19);
															harness.states.getState(
																'fritzdect.0.DECT_117951033333.absenk',
																function(err, state) {
																	if (err) console.error(err);
																	expect(state).to.exist;
																	if (!state) {
																		console.error(
																			'state "fritzdect.0.DECT_117951033333.absenk" not set'
																		);
																	} else {
																		console.log(
																			'fritzdect.0.DECT_117951033333.absenk        ... ' +
																				state.val
																		);
																	}
																	expect(state.val).to.exist;
																	expect(state.val).to.be.equal(15);
																	harness.states.getState(
																		'fritzdect.0.DECT_117951033333.tist',
																		function(err, state) {
																			if (err) console.error(err);
																			expect(state).to.exist;
																			if (!state) {
																				console.error(
																					'state "fritzdect.0.DECT_117951033333.tist" not set'
																				);
																			} else {
																				console.log(
																					'fritzdect.0.DECT_117951033333.tist        ... ' +
																						state.val
																				);
																			}
																			expect(state.val).to.exist;
																			expect(state.val).to.be.equal(20);
																			harness.states.getState(
																				'fritzdect.0.DECT_117951033333.celsius',
																				function(err, state) {
																					if (err) console.error(err);
																					expect(state).to.exist;
																					if (!state) {
																						console.error(
																							'state "fritzdect.0.DECT_117951033333.celsius" not set'
																						);
																					} else {
																						console.log(
																							'fritzdect.0.DECT_117951033333.celsius            ... ' +
																								state.val
																						);
																					}
																					expect(state.val).to.exist;
																					expect(state.val).to.be.equal(20);
																					harness.states.getState(
																						'fritzdect.0.DECT_117951033333.battery',
																						function(err, state) {
																							if (err) console.error(err);
																							expect(state).to.exist;
																							if (!state) {
																								console.error(
																									'state "fritzdect.0.DECT_117951033333.battery" not set'
																								);
																							} else {
																								console.log(
																									'fritzdect.0.DECT_117951033333.battery          ... ' +
																										state.val
																								);
																								expect(state.val).to
																									.exist;
																								expect(
																									state.val
																								).to.be.equal(80);
																								resolve();
																							}
																						}
																					);
																				}
																			);
																		}
																	);
																}
															);
														}
													);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Fritzdect Comet wo battcharge should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_119600642220.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_119600642220.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_119600642220.productname        ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Comet DECT');
							harness.states.getState('fritzdect.0.DECT_119600642220.manufacturer', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_119600642220.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_119600642220.manufacturer    ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_119600642220.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_119600642220.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_119600642220.fwversion       ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('03.54');
									harness.states.getState('fritzdect.0.DECT_119600642220.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_119600642220.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_119600642220.id              ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('17');
										harness.states.getState('fritzdect.0.DECT_119600642220.devicelock', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_119600642220.devicelock" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_119600642220.devicelock      ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal(false);
											harness.states.getState('fritzdect.0.DECT_119600642220.present', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_119600642220.present" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_119600642220.present          ... ' +
															state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState('fritzdect.0.DECT_119600642220.lock', function(
													err,
													state
												) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_119600642220.lock" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_119600642220.lock            ... ' +
																state.val
														);
													}
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(false);
													harness.states.getState(
														'fritzdect.0.DECT_119600642220.komfort',
														function(err, state) {
															if (err) console.error(err);
															expect(state).to.exist;
															if (!state) {
																console.error(
																	'state "fritzdect.0.DECT_119600642220.komfort" not set'
																);
															} else {
																console.log(
																	'fritzdect.0.DECT_119600642220.komfort        ... ' +
																		state.val
																);
															}
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(21);
															harness.states.getState(
																'fritzdect.0.DECT_119600642220.absenk',
																function(err, state) {
																	if (err) console.error(err);
																	expect(state).to.exist;
																	if (!state) {
																		console.error(
																			'state "fritzdect.0.DECT_119600642220.absnek" not set'
																		);
																	} else {
																		console.log(
																			'fritzdect.0.DECT_119600642220.absenk        ... ' +
																				state.val
																		);
																	}
																	expect(state.val).to.exist;
																	expect(state.val).to.be.equal(16);
																	harness.states.getState(
																		'fritzdect.0.DECT_119600642220.tist',
																		function(err, state) {
																			if (err) console.error(err);
																			expect(state).to.exist;
																			if (!state) {
																				console.error(
																					'state "fritzdect.0.DECT_119600642220.tist" not set'
																				);
																			} else {
																				console.log(
																					'fritzdect.0.DECT_119600642220.tist        ... ' +
																						state.val
																				);
																			}
																			expect(state.val).to.exist;
																			expect(state.val).to.be.equal(20);
																			harness.states.getState(
																				'fritzdect.0.DECT_119600642220.celsius',
																				function(err, state) {
																					if (err) console.error(err);
																					expect(state).to.exist;
																					if (!state) {
																						console.error(
																							'state "fritzdect.0.DECT_119600642220.celsius" not set'
																						);
																					} else {
																						console.log(
																							'fritzdect.0.DECT_119600642220.celsius                ... ' +
																								state.val
																						);
																						expect(state.val).to.exist;
																						expect(state.val).to.be.equal(
																							20
																						);
																						resolve();
																					}
																					/* für später, wenn der batteryaufruf schon beim init kommt
																	harness.states.getState('fritzdect.0.DECT_119600642220.battery', function (err, state) {
																		if (err) console.error(err);
																		expect(state).to.exist;
																		if (!state) {
																			console.error('state "fritzdect.0.DECT_119600642220.battery" not set');
																		}
																		else {
																			console.log('fritzdect.0.DECT_119600642220.battery             ... ' + state.val);
																			expect(state.val).to.exist;
																			expect(state.val).to.be.equal('55');
																			resolve();
																		}
																	});
																	*/
																				}
																			);
																		}
																	);
																}
															);
														}
													);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Contact should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_112240205290-1.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_112240205290-1.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_112240205290-1.productname    ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('HAN-FUN');
							harness.states.getState('fritzdect.0.DECT_112240205290-1.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_112240205290-1.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_112240205290-1.manufacturer    ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('0x2c3c');
								harness.states.getState('fritzdect.0.DECT_112240205290-1.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_112240205290-1.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_112240205290-1.fwversion       ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('0.0');
									harness.states.getState('fritzdect.0.DECT_112240205290-1.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_112240205290-1.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_112240205290-1.id             ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('2413');
										harness.states.getState('fritzdect.0.DECT_112240205290-1.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_112240205290-1.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_112240205290-1.name        ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('Fenster');
											harness.states.getState('fritzdect.0.DECT_112240205290-1.state', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_112240205290-1.state" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_112240205290-1.state       ... ' + state.val
													);
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(false);
													resolve();
												}
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Button should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_119340141058-2.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_119340141058-2.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_119340141058-2.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('HAN-FUN');
							harness.states.getState('fritzdect.0.DECT_119340141058-2.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_119340141058-2.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_119340141058-2.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('0x0feb');
								harness.states.getState('fritzdect.0.DECT_119340141058-2.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_119340141058-2.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_119340141058-2.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('0.0');
									harness.states.getState('fritzdect.0.DECT_119340141058-2.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_119340141058-2.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_119340141058-2.id           ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('406');
										harness.states.getState('fritzdect.0.DECT_119340141058-2.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_119340141058-2.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_119340141058-2.name         ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('DectTaster_F1');
											harness.states.getState(
												'fritzdect.0.DECT_119340141058-2.lastpressedtimestamp',
												function(err, state) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_119340141058-2.lastpressedtimestamp" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_119340141058-2.lastpressedtimestamp  ... ' +
																state.val
														);
														expect(state.val).to.exist;
														expect(state.val).to.be.equal('Mon Oct 01 2018 20:41:32 GMT+0000 (Coordinated Universal Time)');
														resolve();
													}
												}
											);
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of 2nd Button from FD400, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_13096321567.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_13096321567.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_13096321567.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!DECT 400');
							harness.states.getState('fritzdect.0.DECT_13096321567.manufacturer', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_13096321567.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_13096321567.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_13096321567.fwversion', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_13096321567.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_13096321567-9.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('04.90');
									harness.states.getState(
										'fritzdect.0.DECT_13096321567.button.13096321567-9.id',
										function(err, state) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_13096321567.button.13096321567-9.id" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_13096321567.button.13096321567-9.id           ... ' +
														state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('5001');
											harness.states.getState(
												'fritzdect.0.DECT_13096321567.button.13096321567-9.name',
												function(err, state) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_13096321567.button.13096321567-9.name" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_13096321567.button.13096321567-9.name         ... ' +
																state.val
														);
													}
													expect(state.val).to.exist;
													expect(state.val).to.be.equal('FRITZ!DECT 400 #14: lang');
													harness.states.getState(
														'fritzdect.0.DECT_13096321567.button.13096321567-9.lastpressedtimestamp',
														function(err, state) {
															if (err) console.error(err);
															expect(state).to.exist;
															if (!state) {
																console.error(
																	'state "fritzdect.0.DECT_13096321567.button.13096321567-9.lastpressedtimestamp" not set'
																);
															} else {
																console.log(
																	'fritzdect.0.DECT_13096321567.button.13096321567-9.lastpressedtimestamp  ... ' +
																		state.val
																);
																expect(state.val).to.exist;
																expect(state.val).to.be.equal(
																	'Sun Feb 03 2019 12:06:35 GMT+0000 (Coordinated Universal Time)'
																);
																resolve();
															}
														}
													);
												}
											);
										}
									);
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Powerlineshould be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_34:31:C1:AB:68:53.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_34:31:C1:AB:68:53.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_34:31:C1:AB:68:53.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!Powerline 546E');
							harness.states.getState('fritzdect.0.DECT_34:31:C1:AB:68:53.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_34:31:C1:AB:68:53.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_34:31:C1:AB:68:53.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_34:31:C1:AB:68:53.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_34:31:C1:AB:68:53.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_34:31:C1:AB:68:53.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('06.92');
									harness.states.getState('fritzdect.0.DECT_34:31:C1:AB:68:53.id', function(
										err,
										state
									) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_34:31:C1:AB:68:53.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_34:31:C1:AB:68:53.id             ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('20001');
										harness.states.getState('fritzdect.0.DECT_34:31:C1:AB:68:53.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_34:31:C1:AB:68:53.name" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_34:31:C1:AB:68:53.name     ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('FRITZ!Powerline');
											harness.states.getState(
												'fritzdect.0.DECT_34:31:C1:AB:68:53.state',
												function(err, state) {
													if (err) console.error(err);
													expect(state).to.exist;
													if (!state) {
														console.error(
															'state "fritzdect.0.DECT_34:31:C1:AB:68:53.state" not set'
														);
													} else {
														console.log(
															'fritzdect.0.DECT_34:31:C1:AB:68:53.state    ... ' +
																state.val
														);
													}
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(false);
													harness.states.getState(
														'fritzdect.0.DECT_34:31:C1:AB:68:53.lock',
														function(err, state) {
															if (err) console.error(err);
															expect(state).to.exist;
															if (!state) {
																console.error(
																	'state "fritzdect.0.DECT_34:31:C1:AB:68:53.lock" not set'
																);
															} else {
																console.log(
																	'fritzdect.0.DECT_34:31:C1:AB:68:53.lock     ... ' +
																		state.val
																);
															}
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(false);
															harness.states.getState(
																'fritzdect.0.DECT_34:31:C1:AB:68:53.present',
																function(err, state) {
																	if (err) console.error(err);
																	expect(state).to.exist;
																	if (!state) {
																		console.error(
																			'state "fritzdect.0.DECT_34:31:C1:AB:68:53.present not set'
																		);
																	} else {
																		console.log(
																			'fritzdect.0.DECT_34:31:C1:AB:68:53.present  ... ' +
																				state.val
																		);
																	}
																	expect(state.val).to.exist;
																	expect(state.val).to.be.equal(true);
																	harness.states.getState(
																		'fritzdect.0.DECT_34:31:C1:AB:68:53.power',
																		function(err, state) {
																			if (err) console.error(err);
																			expect(state).to.exist;
																			if (!state) {
																				console.error(
																					'state "fritzdect.0.DECT_34:31:C1:AB:68:53.power" not set'
																				);
																			} else {
																				console.log(
																					'fritzdect.0.DECT_34:31:C1:AB:68:53.power    ... ' +
																						state.val
																				);
																			}
																			expect(state.val).to.exist;
																			expect(state.val).to.be.equal(0);
																			harness.states.getState(
																				'fritzdect.0.DECT_34:31:C1:AB:68:53.energy',
																				function(err, state) {
																					if (err) console.error(err);
																					expect(state).to.exist;
																					if (!state) {
																						console.error(
																							'state "fritzdect.0.DECT_34:31:C1:AB:68:53.energy" not set'
																						);
																					} else {
																						console.log(
																							'fritzdect.0.DECT_34:31:C1:AB:68:53.energy   ... ' +
																								state.val
																						);
																						expect(state.val).to.exist;
																						expect(state.val).to.be.equal(
																							19331
																						);
																						resolve();
																					}
																				}
																			);
																		}
																	);
																}
															);
														}
													);
												}
											);
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Repeater should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_087611016969.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_087611016969.name" not set');
							} else {
								console.log('fritzdect.0.DECT_087611016969.name          ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Repeater');
							harness.states.getState('fritzdect.0.DECT_087611016969.present', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_087611016969.present" not set');
								} else {
									console.log('fritzdect.0.DECT_087611016969.present       ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal(true);
								harness.states.getState('fritzdect.0.DECT_087611016969.id', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_087611016969.id" not set');
									} else {
										console.log('fritzdect.0.DECT_087611016969.id            ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('23');
									harness.states.getState('fritzdect.0.DECT_087611016969.fwversion', function(
										err,
										state
									) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_087611016969.fwversion" not set');
										} else {
											console.log('fritzdect.0.DECT_087611016969.fwversion     ... ' + state.val);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('03.86');
										harness.states.getState('fritzdect.0.DECT_087611016969.manufacturer', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_087611016969.manufacturer" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_087611016969.manufacturer  ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('AVM');
											harness.states.getState('fritzdect.0.DECT_087611016969.celsius', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_087611016969.celsius" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_087611016969.celsius          ... ' +
															state.val
													);
													expect(state.val).to.exist;
													expect(state.val).to.be.equal(17.5);
													resolve();
												}
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Lamp DECT500 white, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_123456789012-1.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_123456789012-1.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_123456789012-1.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!DECT 500');
							harness.states.getState('fritzdect.0.DECT_123456789012-1.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_123456789012-1.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_123456789012-1.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_123456789012-1.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_123456789012-1.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_123456789012-1.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('0.0');
									harness.states.getState('fritzdect.0.DECT_123456789012-1.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_123456789012-1.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_123456789012-1.id             ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('406');
										harness.states.getState('fritzdect.0.DECT_123456789012-1.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_123456789012-1.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_123456789012-1.name     ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('FRITZ!DECT 500');
											harness.states.getState('fritzdect.0.DECT_123456789012-1.state', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_123456789012-1.state" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_123456789012-1.state    ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState(
													'fritzdect.0.DECT_123456789012-1.txbusy',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_123456789012-1.txbusy" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_123456789012-1.txbusy     ... ' +
																	state.val
															);
														}
														expect(state.val).to.exist;
														expect(state.val).to.be.equal(false);
														harness.states.getState(
															'fritzdect.0.DECT_123456789012-1.present',
															function(err, state) {
																if (err) console.error(err);
																expect(state).to.exist;
																if (!state) {
																	console.error(
																		'state "fritzdect.0.DECT_123456789012-1.present not set'
																	);
																} else {
																	console.log(
																		'fritzdect.0.DECT_123456789012-1.present  ... ' +
																			state.val
																	);
																}
																expect(state.val).to.exist;
																expect(state.val).to.be.equal(true);
																harness.states.getState(
																	'fritzdect.0.DECT_123456789012-1.level',
																	function(err, state) {
																		if (err) console.error(err);
																		expect(state).to.exist;
																		if (!state) {
																			console.error(
																				'state "fritzdect.0.DECT_123456789012-1.level" not set'
																			);
																		} else {
																			console.log(
																				'fritzdect.0.DECT_123456789012-1.level    ... ' +
																					state.val
																			);
																		}
																		expect(state.val).to.exist;
																		expect(state.val).to.be.equal(255);
																		harness.states.getState(
																			'fritzdect.0.DECT_123456789012-1.levelpercentage',
																			function(err, state) {
																				if (err) console.error(err);
																				expect(state).to.exist;
																				if (!state) {
																					console.error(
																						'state "fritzdect.0.DECT_123456789012-1.levelpercentage" not set'
																					);
																				} else {
																					console.log(
																						'fritzdect.0.DECT_123456789012-1.levelpercentage    ... ' +
																							state.val
																					);
																				}
																				expect(state.val).to.exist;
																				expect(state.val).to.be.equal(100);
																				harness.states.getState(
																					'fritzdect.0.DECT_123456789012-1.supported_modes',
																					function(err, state) {
																						if (err) console.error(err);
																						expect(state).to.exist;
																						if (!state) {
																							console.error(
																								'state "fritzdect.0.DECT_123456789012-1.supported_modes" not set'
																							);
																						} else {
																							console.log(
																								'fritzdect.0.DECT_123456789012-1.supported_modes    ... ' +
																									state.val
																							);
																						}
																						expect(state.val).to.exist;
																						expect(state.val).to.be.equal(
																							5
																						);
																						harness.states.getState(
																							'fritzdect.0.DECT_123456789012-1.current_mode',
																							function(err, state) {
																								if (err)
																									console.error(err);
																								expect(state).to.exist;
																								if (!state) {
																									console.error(
																										'state "fritzdect.0.DECT_123456789012-1.current_mode" not set'
																									);
																								} else {
																									console.log(
																										'fritzdect.0.DECT_123456789012-1.current__mode    ... ' +
																											state.val
																									);
																								}
																								expect(state.val).to
																									.exist;
																								expect(
																									state.val
																								).to.be.equal(4);
																								harness.states.getState(
																									'fritzdect.0.DECT_123456789012-1.hue',
																									function(
																										err,
																										state
																									) {
																										if (err)
																											console.error(
																												err
																											);
																										expect(state).to
																											.exist;
																										if (!state) {
																											console.error(
																												'state "fritzdect.0.DECT_123456789012-1.hue" not set'
																											);
																										} else {
																											console.log(
																												'fritzdect.0.DECT_123456789012-1.hue    ... ' +
																													state.val
																											);
																										}
																										//expect(state.val).to.exist;
																										expect(
																											state.val
																										).to.be.equal(
																											null
																										); // im Abbild null aber predefined
																										harness.states.getState(
																											'fritzdect.0.DECT_123456789012-1.saturation',
																											function(
																												err,
																												state
																											) {
																												if (err)
																													console.error(
																														err
																													);
																												expect(
																													state
																												).to
																													.exist;
																												if (
																													!state
																												) {
																													console.error(
																														'state "fritzdect.0.DECT_123456789012-1.saturation" not set'
																													);
																												} else {
																													console.log(
																														'fritzdect.0.DECT_123456789012-1.saturation    ... ' +
																															state.val
																													);
																												}
																												//expect(state.val).to.exist;
																												expect(
																													state.val
																												).to.be.equal(
																													null
																												); // im Abbild null aber predefined
																												harness.states.getState(
																													'fritzdect.0.DECT_123456789012-1.temperature',
																													function(
																														err,
																														state
																													) {
																														if (
																															err
																														)
																															console.error(
																																err
																															);
																														expect(
																															state
																														)
																															.to
																															.exist;
																														if (
																															!state
																														) {
																															console.error(
																																'state "fritzdect.0.DECT_123456789012-1.temperature" not set'
																															);
																														} else {
																															console.log(
																																'fritzdect.0.DECT_123456789012-1.temperature   ... ' +
																																	state.val
																															);
																															expect(
																																state.val
																															)
																																.to
																																.exist;
																															expect(
																																state.val
																															).to.be.equal(
																																3400
																															);
																															resolve();
																														}
																													}
																												);
																											}
																										);
																									}
																								);
																							}
																						);
																					}
																				);
																			}
																		);
																	}
																);
															}
														);
													}
												);
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Lamp DECT500 color, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_130770000415-1.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_130770000415-1.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_130770000415-1.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!DECT 500');
							harness.states.getState('fritzdect.0.DECT_130770000415-1.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_130770000415-1.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_130770000415-1.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_130770000415-1.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_130770000415-1.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_130770000415-1.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('0.0');
									harness.states.getState('fritzdect.0.DECT_130770000415-1.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_130770000415-1.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_130770000415-1.id             ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('407');
										harness.states.getState('fritzdect.0.DECT_130770000415-1.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_130770000415-1.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_130770000415-1.name     ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('FRITZ!DECT 500');
											harness.states.getState('fritzdect.0.DECT_130770000415-1.state', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_130770000415-1.state" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_130770000415-1.state    ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(true);
												harness.states.getState(
													'fritzdect.0.DECT_130770000415-1.txbusy',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_130770000415-1.txbusy" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_130770000415-1.txbusy     ... ' +
																	state.val
															);
														}
														expect(state.val).to.exist;
														expect(state.val).to.be.equal(false);
														harness.states.getState(
															'fritzdect.0.DECT_130770000415-1.present',
															function(err, state) {
																if (err) console.error(err);
																expect(state).to.exist;
																if (!state) {
																	console.error(
																		'state "fritzdect.0.DECT_130770000415-1.present not set'
																	);
																} else {
																	console.log(
																		'fritzdect.0.DECT_130770000415-1.present  ... ' +
																			state.val
																	);
																}
																expect(state.val).to.exist;
																expect(state.val).to.be.equal(true);
																harness.states.getState(
																	'fritzdect.0.DECT_130770000415-1.level',
																	function(err, state) {
																		if (err) console.error(err);
																		expect(state).to.exist;
																		if (!state) {
																			console.error(
																				'state "fritzdect.0.DECT_130770000415-1.level" not set'
																			);
																		} else {
																			console.log(
																				'fritzdect.0.DECT_130770000415-1.level    ... ' +
																					state.val
																			);
																		}
																		expect(state.val).to.exist;
																		expect(state.val).to.be.equal(255);
																		harness.states.getState(
																			'fritzdect.0.DECT_130770000415-1.levelpercentage',
																			function(err, state) {
																				if (err) console.error(err);
																				expect(state).to.exist;
																				if (!state) {
																					console.error(
																						'state "fritzdect.0.DECT_130770000415-1.levelpercentage" not set'
																					);
																				} else {
																					console.log(
																						'fritzdect.0.DECT_130770000415-1.levelpercentage    ... ' +
																							state.val
																					);
																				}
																				expect(state.val).to.exist;
																				expect(state.val).to.be.equal(100);
																				harness.states.getState(
																					'fritzdect.0.DECT_130770000415-1.supported_modes',
																					function(err, state) {
																						if (err) console.error(err);
																						expect(state).to.exist;
																						if (!state) {
																							console.error(
																								'state "fritzdect.0.DECT_130770000415-1.supported_modes" not set'
																							);
																						} else {
																							console.log(
																								'fritzdect.0.DECT_130770000415-1.supported_modes    ... ' +
																									state.val
																							);
																						}
																						expect(state.val).to.exist;
																						expect(state.val).to.be.equal(
																							5
																						);
																						harness.states.getState(
																							'fritzdect.0.DECT_130770000415-1.current_mode',
																							function(err, state) {
																								if (err)
																									console.error(err);
																								expect(state).to.exist;
																								if (!state) {
																									console.error(
																										'state "fritzdect.0.DECT_130770000415-1.current_mode" not set'
																									);
																								} else {
																									console.log(
																										'fritzdect.0.DECT_130770000415-1.current_mode    ... ' +
																											state.val
																									);
																								}
																								expect(state.val).to
																									.exist;
																								expect(
																									state.val
																								).to.be.equal(1);
																								harness.states.getState(
																									'fritzdect.0.DECT_130770000415-1.hue',
																									function(
																										err,
																										state
																									) {
																										if (err)
																											console.error(
																												err
																											);
																										expect(state).to
																											.exist;
																										if (!state) {
																											console.error(
																												'state "fritzdect.0.DECT_130770000415-1.hue" not set'
																											);
																										} else {
																											console.log(
																												'fritzdect.0.DECT_130770000415-1.hue    ... ' +
																													state.val
																											);
																										}
																										expect(
																											state.val
																										).to.exist;
																										expect(
																											state.val
																										).to.be.equal(
																											348
																										);
																										harness.states.getState(
																											'fritzdect.0.DECT_130770000415-1.saturation',
																											function(
																												err,
																												state
																											) {
																												if (err)
																													console.error(
																														err
																													);
																												expect(
																													state
																												).to
																													.exist;
																												if (
																													!state
																												) {
																													console.error(
																														'state "fritzdect.0.DECT_130770000415-1.saturation" not set'
																													);
																												} else {
																													console.log(
																														'fritzdect.0.DECT_130770000415-1.saturation    ... ' +
																															state.val
																													);
																												}
																												expect(
																													state.val
																												).to
																													.exist;
																												expect(
																													state.val
																												).to.be.equal(
																													179
																												);
																												harness.states.getState(
																													'fritzdect.0.DECT_130770000415-1.temperature',
																													function(
																														err,
																														state
																													) {
																														if (
																															err
																														)
																															console.error(
																																err
																															);
																														expect(
																															state
																														)
																															.to
																															.exist;
																														if (
																															!state
																														) {
																															console.error(
																																'state "fritzdect.0.DECT_130770000415-1.temperature" not set'
																															);
																														} else {
																															console.log(
																																'fritzdect.0.DECT_130770000415-1.temperature   ... ' +
																																	state.val
																															);
																															//expect(state.val).to.exist;
																															expect(
																																state.val
																															).to.be.equal(
																																null
																															);
																															resolve();
																														}
																													}
																												);
																											}
																										);
																									}
																								);
																							}
																						);
																					}
																				);
																			}
																		);
																	}
																);
															}
														);
													}
												);
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Lamp DECT500 color with extended states, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_130770018976-1.productname', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_130770018976-1.productname" not set');
							} else {
								console.log('fritzdect.0.DECT_130770018976-1.productname     ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FRITZ!DECT 500');
							harness.states.getState('fritzdect.0.DECT_130770018976-1.manufacturer', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_130770018976-1.manufacturer" not set');
								} else {
									console.log('fritzdect.0.DECT_130770018976-1.manufacturer ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal('AVM');
								harness.states.getState('fritzdect.0.DECT_130770018976-1.fwversion', function(
									err,
									state
								) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_130770018976-1.fwversion" not set');
									} else {
										console.log('fritzdect.0.DECT_130770018976-1.fwversion    ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('0.0');
									harness.states.getState('fritzdect.0.DECT_130770018976-1.id', function(err, state) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_130770018976-1.id" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_130770018976-1.id             ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('408');
										harness.states.getState('fritzdect.0.DECT_130770018976-1.name', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error('state "fritzdect.0.DECT_130770018976-1.name" not set');
											} else {
												console.log(
													'fritzdect.0.DECT_130770018976-1.name     ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('FRITZ!DECT Lampe');
											harness.states.getState('fritzdect.0.DECT_130770018976-1.state', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_130770018976-1.state" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_130770018976-1.state    ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(false);
												harness.states.getState(
													'fritzdect.0.DECT_130770018976-1.txbusy',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_130770018976-1.txbusy" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_130770018976-1.txbusy     ... ' +
																	state.val
															);
														}
														expect(state.val).to.exist;
														expect(state.val).to.be.equal(false);
														harness.states.getState(
															'fritzdect.0.DECT_130770018976-1.present',
															function(err, state) {
																if (err) console.error(err);
																expect(state).to.exist;
																if (!state) {
																	console.error(
																		'state "fritzdect.0.DECT_130770018976-1.present not set'
																	);
																} else {
																	console.log(
																		'fritzdect.0.DECT_130770018976-1.present  ... ' +
																			state.val
																	);
																}
																expect(state.val).to.exist;
																expect(state.val).to.be.equal(true);
																harness.states.getState(
																	'fritzdect.0.DECT_130770018976-1.level',
																	function(err, state) {
																		if (err) console.error(err);
																		expect(state).to.exist;
																		if (!state) {
																			console.error(
																				'state "fritzdect.0.DECT_130770018976-1.level" not set'
																			);
																		} else {
																			console.log(
																				'fritzdect.0.DECT_130770018976-1.level    ... ' +
																					state.val
																			);
																		}
																		expect(state.val).to.exist;
																		expect(state.val).to.be.equal(175);
																		harness.states.getState(
																			'fritzdect.0.DECT_130770018976-1.levelpercentage',
																			function(err, state) {
																				if (err) console.error(err);
																				expect(state).to.exist;
																				if (!state) {
																					console.error(
																						'state "fritzdect.0.DECT_130770018976-1.levelpercentage" not set'
																					);
																				} else {
																					console.log(
																						'fritzdect.0.DECT_130770018976-1.levelpercentage    ... ' +
																							state.val
																					);
																				}
																				expect(state.val).to.exist;
																				expect(state.val).to.be.equal(69);
																				harness.states.getState(
																					'fritzdect.0.DECT_130770018976-1.supported_modes',
																					function(err, state) {
																						if (err) console.error(err);
																						expect(state).to.exist;
																						if (!state) {
																							console.error(
																								'state "fritzdect.0.DECT_130770018976-1.supported_modes" not set'
																							);
																						} else {
																							console.log(
																								'fritzdect.0.DECT_130770018976-1.supported_modes    ... ' +
																									state.val
																							);
																						}
																						expect(state.val).to.exist;
																						expect(state.val).to.be.equal(
																							5
																						);
																						harness.states.getState(
																							'fritzdect.0.DECT_130770018976-1.current_mode',
																							function(err, state) {
																								if (err)
																									console.error(err);
																								expect(state).to.exist;
																								if (!state) {
																									console.error(
																										'state "fritzdect.0.DECT_130770018976-1.current_mode" not set'
																									);
																								} else {
																									console.log(
																										'fritzdect.0.DECT_130770018976-1.current_mode    ... ' +
																											state.val
																									);
																								}
																								expect(state.val).to
																									.exist;
																								expect(
																									state.val
																								).to.be.equal(1);
																								harness.states.getState(
																									'fritzdect.0.DECT_130770018976-1.hue',
																									function(
																										err,
																										state
																									) {
																										if (err)
																											console.error(
																												err
																											);
																										expect(state).to
																											.exist;
																										if (!state) {
																											console.error(
																												'state "fritzdect.0.DECT_130770018976-1.hue" not set'
																											);
																										} else {
																											console.log(
																												'fritzdect.0.DECT_130770018976-1.hue    ... ' +
																													state.val
																											);
																										}
																										expect(
																											state.val
																										).to.exist;
																										expect(
																											state.val
																										).to.be.equal(
																											35
																										);
																										harness.states.getState(
																											'fritzdect.0.DECT_130770018976-1.saturation',
																											function(
																												err,
																												state
																											) {
																												if (err)
																													console.error(
																														err
																													);
																												expect(
																													state
																												).to
																													.exist;
																												if (
																													!state
																												) {
																													console.error(
																														'state "fritzdect.0.DECT_130770018976-1.saturation" not set'
																													);
																												} else {
																													console.log(
																														'fritzdect.0.DECT_130770018976-1.saturation    ... ' +
																															state.val
																													);
																												}
																												expect(
																													state.val
																												).to
																													.exist;
																												expect(
																													state.val
																												).to.be.equal(
																													214
																												);
																												harness.states.getState(
																													'fritzdect.0.DECT_130770018976-1.fullcolorsupport',
																													function(
																														err,
																														state
																													) {
																														if (
																															err
																														)
																															console.error(
																																err
																															);
																														expect(
																															state
																														)
																															.to
																															.exist;
																														if (
																															!state
																														) {
																															console.error(
																																'state "fritzdect.0.DECT_130770018976-1.fullcolorsupport" not set'
																															);
																														} else {
																															console.log(
																																'fritzdect.0.DECT_130770018976-1.fullcolorsupport   ... ' +
																																	state.val
																															);
																															expect(
																																state.val
																															)
																																.to
																																.exist;
																															expect(
																																state.val
																															).to.be.equal(
																																true
																															);
																															harness.states.getState(
																																'fritzdect.0.DECT_130770018976-1.mapped',
																																function(
																																	err,
																																	state
																																) {
																																	if (
																																		err
																																	)
																																		console.error(
																																			err
																																		);
																																	expect(
																																		state
																																	)
																																		.to
																																		.exist;
																																	if (
																																		!state
																																	) {
																																		console.error(
																																			'state "fritzdect.0.DECT_130770018976-1.mapped" not set'
																																		);
																																	} else {
																																		console.log(
																																			'fritzdect.0.DECT_130770018976-1.mapped   ... ' +
																																				state.val
																																		);
																																		expect(
																																			state.val
																																		)
																																			.to
																																			.exist;
																																		expect(
																																			state.val
																																		).to.be.equal(
																																			true
																																		);
																																		harness.states.getState(
																																			'fritzdect.0.DECT_130770018976-1.unmapped_hue',
																																			function(
																																				err,
																																				state
																																			) {
																																				if (
																																					err
																																				)
																																					console.error(
																																						err
																																					);
																																				expect(
																																					state
																																				)
																																					.to
																																					.exist;
																																				if (
																																					!state
																																				) {
																																					console.error(
																																						'state "fritzdect.0.DECT_130770018976-1.unmapped_hue" not set'
																																					);
																																				} else {
																																					console.log(
																																						'fritzdect.0.DECT_130770018976-1.unmapped_hue   ... ' +
																																							state.val
																																					);
																																					expect(
																																						state.val
																																					)
																																						.to
																																						.exist;
																																					expect(
																																						state.val
																																					).to.be.equal(
																																						15
																																					);
																																					harness.states.getState(
																																						'fritzdect.0.DECT_130770018976-1.unmapped_saturation',
																																						function(
																																							err,
																																							state
																																						) {
																																							if (
																																								err
																																							)
																																								console.error(
																																									err
																																								);
																																							expect(
																																								state
																																							)
																																								.to
																																								.exist;
																																							if (
																																								!state
																																							) {
																																								console.error(
																																									'state "fritzdect.0.DECT_130770018976-1.unmapped_saturation" not set'
																																								);
																																							} else {
																																								console.log(
																																									'fritzdect.0.DECT_130770018976-1.unmapped_saturation   ... ' +
																																										state.val
																																								);
																																								expect(
																																									state.val
																																								)
																																									.to
																																									.exist;
																																								expect(
																																									state.val
																																								).to.be.equal(
																																									255
																																								);
																																								resolve();
																																							}
																																						}
																																					);
																																				}
																																			}
																																		);
																																	}
																																}
																															);
																														}
																													}
																												);
																											}
																										);
																									}
																								);
																							}
																						);
																					}
																				);
																			}
																		);
																	}
																);
															}
														);
													}
												);
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of DECT440, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_099950403922.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_099950403922.name" not set');
							} else {
								console.log('fritzdect.0.DECT_099950403922.name          ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FT-Wohnzimmer');
							harness.states.getState('fritzdect.0.DECT_099950403922.present', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_099950403922.present" not set');
								} else {
									console.log('fritzdect.0.DECT_099950403922.present       ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal(true);
								harness.states.getState('fritzdect.0.DECT_099950403922.id', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_099950403922.id" not set');
									} else {
										console.log('fritzdect.0.DECT_099950403922.id            ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('56');
									harness.states.getState('fritzdect.0.DECT_099950403922.fwversion', function(
										err,
										state
									) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_099950403922.fwversion" not set');
										} else {
											console.log('fritzdect.0.DECT_099950403922.fwversion     ... ' + state.val);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('05.10');
										harness.states.getState('fritzdect.0.DECT_099950403922.manufacturer', function(
											err,
											state
										) {
											if (err) console.error(err);
											expect(state).to.exist;
											if (!state) {
												console.error(
													'state "fritzdect.0.DECT_099950403922.manufacturer" not set'
												);
											} else {
												console.log(
													'fritzdect.0.DECT_099950403922.manufacturer  ... ' + state.val
												);
											}
											expect(state.val).to.exist;
											expect(state.val).to.be.equal('AVM');
											harness.states.getState('fritzdect.0.DECT_099950403922.celsius', function(
												err,
												state
											) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_099950403922.celsius" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_099950403922.celsius          ... ' +
															state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal(18.5);
												harness.states.getState(
													'fritzdect.0.DECT_099950403922.rel_humidity',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_099950403922.rel_humidity" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_099950403922.rel_humidity          ... ' +
																	state.val
															);
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(52);
															resolve();
														}
													}
												);
											});
										});
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of Blinds, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.DECT_119340395779-1.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.DECT_119340395779-1.name" not set');
							} else {
								console.log('fritzdect.0.DECT_119340395779-1.name          ... ' + state.val);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('test Rollladen');
							harness.states.getState('fritzdect.0.DECT_119340395779-1.present', function(err, state) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.DECT_119340395779-1.present" not set');
								} else {
									console.log('fritzdect.0.DECT_119340395779-1.present       ... ' + state.val);
								}
								expect(state.val).to.exist;
								expect(state.val).to.be.equal(true);
								harness.states.getState('fritzdect.0.DECT_119340395779-1.id', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_119340395779-1.id" not set');
									} else {
										console.log('fritzdect.0.DECT_119340395779-1.id            ... ' + state.val);
									}
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('406');
									harness.states.getState('fritzdect.0.DECT_119340395779-1.fwversion', function(
										err,
										state
									) {
										if (err) console.error(err);
										expect(state).to.exist;
										if (!state) {
											console.error('state "fritzdect.0.DECT_119340395779-1.fwversion" not set');
										} else {
											console.log(
												'fritzdect.0.DECT_119340395779-1.fwversion     ... ' + state.val
											);
										}
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('0.0');
										harness.states.getState(
											'fritzdect.0.DECT_119340395779-1.manufacturer',
											function(err, state) {
												if (err) console.error(err);
												expect(state).to.exist;
												if (!state) {
													console.error(
														'state "fritzdect.0.DECT_119340395779-1.manufacturer" not set'
													);
												} else {
													console.log(
														'fritzdect.0.DECT_119340395779-1.manufacturer  ... ' + state.val
													);
												}
												expect(state.val).to.exist;
												expect(state.val).to.be.equal('0x0feb');
												harness.states.getState(
													'fritzdect.0.DECT_119340395779-1.level',
													function(err, state) {
														if (err) console.error(err);
														expect(state).to.exist;
														if (!state) {
															console.error(
																'state "fritzdect.0.DECT_119340395779-1.level" not set'
															);
														} else {
															console.log(
																'fritzdect.0.DECT_119340395779-1.level          ... ' +
																	state.val
															);
															expect(state.val).to.exist;
															expect(state.val).to.be.equal(77);
															resolve();
															// to be added levelpercentage, alert state, alert lastalertchgtimestamp
														}
													}
												);
											}
										);
									});
								});
							});
						});
					});
				});
			}).timeout(20000);
			/* Vorlage
			it(' should be created', () => {
				return new Promise( (resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);


					});
				});
			}).timeout(20000);
			*/
			//hier für template ein neues describe?
			it('Objects must exist for template_tmp6F0093-39091EED0', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.objects.getObject('fritzdect.0.template_tmp6F0093-39091EED0.name', (err, obj) => {
							if (err) console.error('template_tmp6F0093-39091EED0.name ' + err);
							expect(obj).to.exist;
							expect(obj).to.be.ok;
							harness.objects.getObject('fritzdect.0.template_tmp6F0093-39091EED0.id', (err, obj) => {
								if (err) console.error('template_tmp6F0093-39091EED0.name ' + err);
								expect(obj).to.exist;
								expect(obj).to.be.ok;
								resolve();
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 1, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-39091EED0.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-39091EED0.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-39091EED0.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Alle aus (Sommer)');
							harness.states.getState('fritzdect.0.template_tmp6F0093-39091EED0.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-39091EED0.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-39091EED0.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60010');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 2, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-390920878.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-390920878.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-390920878.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Normal Bad');
							harness.states.getState('fritzdect.0.template_tmp6F0093-390920878.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-390920878.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-390920878.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60011');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 3, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-390920F4A.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-390920F4A.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-390920F4A.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Normal Schlafzimmer');
							harness.states.getState('fritzdect.0.template_tmp6F0093-390920F4A.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-390920F4A.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-390920F4A.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60005');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 4 should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-39091E943.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-39091E943.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-39091E943.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Urlaub Anfang');
							harness.states.getState('fritzdect.0.template_tmp6F0093-39091E943.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-39091E943.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-39091E943.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60009');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 5, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-391363146.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-391363146.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-391363146.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Urlaub Ende');
							harness.states.getState('fritzdect.0.template_tmp6F0093-391363146.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-391363146.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-391363146.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60008');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 6,should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-39091E733.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-39091E733.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-39091E733.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Wohnen Home');
							harness.states.getState('fritzdect.0.template_tmp6F0093-39091E733.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-39091E733.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-39091E733.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60006');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 7, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp6F0093-39091E428.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp6F0093-39091E428.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp6F0093-39091E428.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('Wohnen Work');
							harness.states.getState('fritzdect.0.template_tmp6F0093-39091E428.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp6F0093-39091E428.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp6F0093-39091E428.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60007');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template 8, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp5665DB-3A1C9EC6F.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp5665DB-3A1C9EC6F.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp5665DB-3A1C9EC6F.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('vorlage_dect200');
							harness.states.getState('fritzdect.0.template_tmp5665DB-3A1C9EC6F.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp5665DB-3A1C9EC6F.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp5665DB-3A1C9EC6F.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60101');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('Check values of template fritzfon, should be created', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						harness.states.getState('fritzdect.0.template_tmp7A1AB5-3C1F5CDF1.name', function(err, state) {
							if (err) console.error(err);
							expect(state).to.exist;
							if (!state) {
								console.error('state "fritzdect.0.template_tmp7A1AB5-3C1F5CDF1.name" not set');
							} else {
								console.log(
									'fritzdect.0.DECT_template_tmp7A1AB5-3C1F5CDF1.name         ... ' + state.val
								);
							}
							expect(state.val).to.exist;
							expect(state.val).to.be.equal('FritzFonApp');
							harness.states.getState('fritzdect.0.template_tmp7A1AB5-3C1F5CDF1.id', function(
								err,
								state
							) {
								if (err) console.error(err);
								expect(state).to.exist;
								if (!state) {
									console.error('state "fritzdect.0.template_tmp7A1AB5-3C1F5CDF1.id" not set');
								} else {
									console.log('fritzdect.0.template_tmp7A1AB5-3C1F5CDF1.id ... ' + state.val);
									expect(state.val).to.exist;
									expect(state.val).to.be.equal('60106');
									resolve();
								}
							});
						});
					});
				});
			}).timeout(20000);
			it('set template and check last activated template ', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						//set a command and after fritzbox comm it should be returend in process image
						harness.states.setState(
							'fritzdect.0.template_tmp6F0093-391363146.toggle',
							{ val: true, ack: false },
							async function(err) {
								if (err) {
									console.log(err);
								}
								await delay(1000);
								harness.states.getState('fritzdect.0.template.lasttemplate', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.template.lasttemplate" not set');
									} else {
										console.log('fritzdect.0.template.lasttemplate ... ' + state.val);
										expect(state.val).to.exist;
										expect(state.val).to.be.equal('60008');
										resolve();
									}
								});
							}
						);
					});
				});
			}).timeout(20000);

			it('Command to DECT200 and check the set datapoint after successful communication', () => {
				return new Promise((resolve) => {
					const harness = getHarness();
					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(3000);
						//set a command and after fritzbox comm it should be returend in process image
						harness.states.setState(
							'fritzdect.0.DECT_087610006161.state',
							{ val: false, ack: false },
							async function(err) {
								if (err) {
									console.log(err);
								}
								await delay(1000);
								harness.states.getState('fritzdect.0.DECT_087610006161.state', function(err, state) {
									if (err) console.error(err);
									expect(state).to.exist;
									if (!state) {
										console.error('state "fritzdect.0.DECT_087610006161.state" not set');
									} else {
										console.log('fritzdect.0.DECT_087610006161.state ... ' + state.val);
										expect(state.val).to.exist;
										expect(state.val).to.be.equal(false);
										resolve();
									}
								});
							}
						);
					});
				});
			}).timeout(20000);

			/*
			it('Should work, to send a message', () => {
				return new Promise( (resolve) => {
					// Create a fresh harness instance each test!
					const harness = getHarness();
					// modification of some starting values

					//schon Teil des iobroker/testing :-)
					//config.common.enabled = true;
					//config.common.loglevel = 'debug';
					// systemConfig.native.secret ='Zgfr56gFe87jJOM'

					//await delay (15000);

					harness._objects.getObject('system.adapter.fritzdect.0', async (err, obj) => {
						obj.native.fritz_ip = 'http://localhost:3333';
						obj.native.fritz_user = 'admin';
						//obj.native.fritz_pw = encrypt(systemConfig.native.secret, 'password');
						obj.native.fritz_pw = encrypt('Zgfr56gFe87jJOM', 'password');
						obj.native.fritz_interval = 300;
						obj.native.fritz_strictssl = true;
						await harness._objects.setObjectAsync(obj._id, obj);

						// Start the adapter and wait until it has started
						await harness.startAdapterAndWait();
						await delay(1000);

						// Perform the actual test:
						harness.sendTo('fritzdect.0', 'test', 'message', (resp) => {
							console.dir(resp);
							resolve();
						});
					});
				});
			}).timeout(20000);
			*/
		});
	}
});

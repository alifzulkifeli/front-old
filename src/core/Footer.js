import React, { Fragment , useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import "../styles.css"



const Footer = () => (
	<section id="footer">
		<div class="container">
			<div class="row text-center text-xs-center text-sm-left text-md-left">
				<div class="col-xs-12 col-sm-4 col-md-4">
			
				</div>
			
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 mt-sm-3">
					<ul class="list-unstyled list-inline social text-center">
						<li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-facebook"></i></a></li>
						<li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-twitter"></i></a></li>
						<li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-instagram"></i></a></li>
						<li class="list-inline-item"><a href="javascript:void();" target="_blank"><i class="fa fa-envelope"></i></a></li>
					</ul>
				</div>
			
			</div>	
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 text-center text-white">
				
					<p class="h6">&copy All right Reversed.<a class="text-green ml-2" href="" target="_blank">jombeli.org</a></p>
				</div>
			
			</div>	
		</div>
	</section>
);

export default withRouter(Footer);

